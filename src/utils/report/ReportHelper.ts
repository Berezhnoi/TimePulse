// Libs
import {Platform} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Template
import {renderReportTemplate} from './report-template';

// Types
import {ReportTemplateParams} from './types';
import {Asset} from 'react-native-image-picker';
import {ShareSingleOptions} from 'react-native-share';

class ReportHelper {
  static async createPDF(reportTemplateParams: ReportTemplateParams) {
    const reportFileName: string = `logs_report_${reportTemplateParams.generatedFor}_${format(
      reportTemplateParams.generatedDate,
      'dd.MM.yyyy',
      {locale: de},
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

    if (selectedImage.uri) {
      urls.push(selectedImage.uri);
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
      email: __DEV__ ? 'dmitrukbogdana@gmail.com' : 'Oksana-jurgenson@t-online.de',
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
