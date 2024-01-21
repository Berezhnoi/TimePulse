import {PermissionStatus, PermissionsAndroid, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

class ImagePickerHelper {
  static async requestCameraPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    let granted: PermissionStatus | null = null;

    try {
      granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Permission',
        message: 'TimePulse requires access to your camera so you can easily select and take photos for work reports.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    } catch (err) {
      console.error('[requestCameraPermission]', err);
    }

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.debug('Camera permission denied');
      return false;
    }
  }

  static async takePhoto(): Promise<ImagePickerResponse | null> {
    try {
      const permissionGranted: boolean = await ImagePickerHelper.requestCameraPermission();

      if (!permissionGranted) {
        throw new Error('Permission denied');
      }

      const options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      };

      const response = await launchCamera(options);

      return response;
    } catch (error) {
      console.error('[takePhoto] ', error);
      return null;
    }
  }

  static async selectPhoto(options: Omit<ImageLibraryOptions, 'mediaType'> = {}): Promise<ImagePickerResponse | null> {
    try {
      const imageLibraryOptions: ImageLibraryOptions = {
        ...options,
        mediaType: 'photo',
      };

      const response = await launchImageLibrary(imageLibraryOptions);

      return response;
    } catch (error) {
      console.error('[selectPhoto] ', error);
      return null;
    }
  }
}

export {ImagePickerHelper};
