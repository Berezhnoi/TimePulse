// Libs
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

// Template
import {renderReportTemplate} from './report-template';

// Types
import {ReportTemplateParams} from './types';

class ReportHelper {
  static async createPDF(reportTemplateParams: ReportTemplateParams) {
    const options: RNHTMLtoPDF.Options = {
      html: renderReportTemplate(reportTemplateParams),
      fileName: 'work-log-report',
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
}

export {ReportHelper};
