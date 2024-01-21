import {useState} from 'react';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import {ImagePickerHelper} from 'utils/ImagePickerHelper';

interface ImagePickerConfig {
  selectionLimit?: number;
  clean?: boolean;
}

const useImagePicker = (config: ImagePickerConfig = {}) => {
  const {selectionLimit, clean = false} = config;

  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      setError('ImagePicker selection/capture cancelled.');
    } else if (response.errorCode || response.errorMessage) {
      setError(`ImagePicker Error: errorCode = ${response.errorCode} errorMessage = ${response.errorMessage}`);
    } else {
      setError(null);
      setAssets(prevState => (clean ? response.assets || [] : prevState.concat(response.assets || [])));
    }
  };

  const takePhoto = async (): Promise<void> => {
    try {
      const response = await ImagePickerHelper.takePhoto();

      if (response) {
        handleImagePickerResponse(response);
      }
    } catch (error) {
      console.error('[takePhoto] ', error);
    }
  };

  const selectPhoto = async (): Promise<void> => {
    try {
      const response = await ImagePickerHelper.selectPhoto({selectionLimit});

      if (response) {
        handleImagePickerResponse(response);
      }
    } catch (error) {
      console.error('[selectPhoto] ', error);
    }
  };

  const resetPhotos = () => setAssets([]);

  const removePhoto = (id: string) => {
    setAssets(prevState => prevState.filter(item => item.id !== id));
  };

  return {selectedImages: assets, error, takePhoto, selectPhoto, removePhoto, resetPhotos};
};

export default useImagePicker;
