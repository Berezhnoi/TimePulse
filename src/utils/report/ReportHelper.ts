// Libs
import {Platform} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Template
import {renderReportTemplate} from './report-template';

// Helper
import {getFileExtension, removeTempDirectory, saveImageToTemp} from './helper';

// Types
import {ReportTemplateParams} from './types';
import {Asset} from 'react-native-image-picker';
import {ShareSingleOptions} from 'react-native-share';

class ReportHelper {
  private static MANAGER_EMAIL: string = 'yk@oj-service.de';

  private static getFormatedDate(date: Date = new Date()) {
    return format(date, 'dd.MM.yyyy', {locale: de});
  }

  static async createPDF(reportTemplateParams: ReportTemplateParams) {
    const reportFileName: string = `logs_report_${reportTemplateParams.generatedFor}_${ReportHelper.getFormatedDate(
      reportTemplateParams.generatedDate,
    )}`;

    const options: RNHTMLtoPDF.Options = {
      html: renderReportTemplate(reportTemplateParams),
      fileName: reportFileName,
      padding: 0,
      bgColor: '#FFF',
      width: 800,
      height: 1035,
    };

    return RNHTMLtoPDF.convert(options);
  }

  static async printReport(reportTemplateParams: ReportTemplateParams): Promise<void> {
    const pdfFil: RNHTMLtoPDF.Pdf = await ReportHelper.createPDF(reportTemplateParams);
    if (!pdfFil.filePath) {
      throw new Error('Failed to create pdf file');
    }
    await RNPrint.print({filePath: pdfFil.filePath});
  }

  static async shareReport(selectedImage: Asset, reportTemplateParams?: ReportTemplateParams): Promise<void> {
    const urls: string[] = [];

    try {
      await removeTempDirectory();
    } catch (err) {
      console.error(err);
    }

    if (selectedImage.uri) {
      let imageUri: string = selectedImage.uri;

      if (Platform.OS === 'android') {
        // Save the selected image with the correct name in a temporary directory
        const tempImagePath = await saveImageToTemp(
          selectedImage.uri,
          `image_report_${ReportHelper.getFormatedDate()}.${
            selectedImage.fileName ? getFileExtension(selectedImage.fileName) : 'jpg'
          }`,
        );
        imageUri = `file://${tempImagePath}`;
      }

      urls.push(imageUri);
    }

    if (reportTemplateParams) {
      try {
        const pdfReport = await ReportHelper.createPDF(reportTemplateParams);
        if (pdfReport.filePath) {
          urls.push(Platform.OS === 'android' ? `file://${pdfReport.filePath}` : pdfReport.filePath);
        }
      } catch (error) {
        console.debug(`[shareReport] createPDF `, error);
      }
    }

    if (urls.length === 0) {
      throw new Error('Something went wrong, there are no files to share');
    }

    const shareOptions: ShareSingleOptions = {
      title: 'Time report',
      subject: 'Time report',
      email: __DEV__ ? 'dmitrukbogdana@gmail.com' : ReportHelper.MANAGER_EMAIL,
      // @ts-ignore
      social: Share.Social.EMAIL,
      failOnCancel: false,
      urls: urls,
    };

    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  }
}

export {ReportHelper};
