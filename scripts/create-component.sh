#!/bin/bash

################################################################################
# Component/Screen Creation Script
#
# This script is used to generate mock files for a component or screen. It creates a folder
# with the component/screen files, including the appropriate file for the component/screen,
# styles file, types file, and an index file.
#
# Usage:
# Run the following command in the terminal:
#
#   ./create-component.sh <component_name> [path] [--screen]
#
# Replace <component_name> with the desired name of your component/screen. The script will
# generate the files with the provided name.
#
# The [path] argument is optional. If specified, the component/screen folder will be created
# in the specified path. Otherwise, the default path is src/components for components and
# src/screens for screens.
#
# The [--screen] flag is optional. If specified, the generated file will have the extension
# .screen.tsx and be treated as a screen. Otherwise, it will have the extension .component.tsx
# and be treated as a component.
#
# Examples:
# Create a component named "MyComponent" in the default path:
#   ./create-component.sh MyComponent
#
# Create a screen named "HomeScreen" in a custom path:
#   ./create-component.sh HomeScreen src/custom/path --screen
#
# Notes:
# - The component/screen name should be in PascalCase.
# - The component/screen folder will be created with the name in kebab-case (e.g., my-component
#   or home-screen).
# - If a component/screen folder with the same name already exists in the specified path, the
#   script will display an error message and abort.
# - The script will generate the following files in the component/screen folder:
#   - <component_name>.component.tsx or <screen_name>.screen.tsx: Contains the component/screen logic.
#   - <component_name>.styles.ts or <screen_name>.styles.ts: Contains the styles for the component/screen.
#   - <component_name>.types.ts or <screen_name>.types.ts: Contains the types/interfaces for the component/screen.
#   - index.ts: Exports the component/screen and its types.
#
################################################################################

# Check if the component name argument is provided
if [ -z "$1" ]; then
  echo "Error: Component name is missing."
  echo "Usage: ./create_component.sh <component_name> [path] [--screen]"
  exit 1
fi

# Check if the component name is in PascalCase
if [[ ! "$1" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
  echo "Error: Component name should be in PascalCase."
  exit 1
fi

# Set the component name and folder name
component_name="$1"
folder_name=$(echo "$component_name" | sed 's/\(.\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')

# Check if the third argument is provided and set the is_screen flag accordingly
if [ "$2" == "--screen" ]; then
  is_screen=true
  path="src/screens" # Use the default screen path
elif [ "$3" == "--screen" ]; then
  is_screen=true
  path=$2
else
  is_screen=false
  path="${2:-src/components}" # Use the second argument as the path for components if provided, otherwise default to "src/components"
fi

# Check if the component/screen folder already exists
if [ -d "$path/$folder_name" ]; then
  echo "Error: Component/screen folder $folder_name already exists in $path."
  exit 1
fi

# Create the folder
mkdir -p "$path/$folder_name"
cd "$path/$folder_name" || exit

# Set the file names based on whether it's a component or a screen
if [ "$is_screen" = true ]; then
  component_file="${folder_name}.screen"
  component_name="${component_name}Screen"
else
  component_file="${folder_name}.component"
fi
styles_file="${folder_name}.styles"
types_file="${folder_name}.types"
index_file="index"

# Create the component/screen file
cat <<EOF >"$component_file.tsx"
// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';

// Types
import {${component_name}Props} from './${types_file}';

// Styles
import styles from './${styles_file}';

const ${component_name}: React.FC<${component_name}Props> = () => {
  return (
    <View style={styles.container}>
      <Text>${component_name}</Text>
    </View>
  );
};

export default ${component_name};
EOF

# Create the styles file
cat <<EOF >"$styles_file.ts"
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

export default styles;
EOF

# Create the types file
if [ "$is_screen" = true ]; then
  cat <<EOF >"$types_file.ts"
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';

export type ${component_name}Props = NativeStackScreenProps<
  RootStackParamList,
  any // Replace screen name here
>;
EOF
else
  cat <<EOF >"$types_file.ts"
export interface ${component_name}Props {
  // Add your props here
}
EOF
fi

# Create the index file
cat <<EOF >"$index_file.ts"
export {default} from './${component_file}';
export * from './${types_file}';
EOF

echo "Mock files for $component_name created successfully in $path/$folder_name folder."
