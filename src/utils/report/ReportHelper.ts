// Libs
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Template
import {renderReportTemplate} from './report-template';

// Types
import {ReportTemplateParams} from './types';

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
}

export {ReportHelper};
