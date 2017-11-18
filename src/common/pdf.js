import jsPDF from 'jspdf';
import I18N from './i18n';
import datePack from './date.i18n.json';

class PDFGenerator {  
  constructor() {
    this.pdf = new jsPDF({unit: 'in'});
  }

  saveRecord(record, pack, name) {
    this.pdf.text(I18N.format('record-title', pack, record.entry), 0.3, 0.42);
    this.pdf.text(`${record.number} / ${record.total}`, 6.8, 0.42);
    this.addLine(0, 8.5, 0.75, 0.05);
    this.addTextLine(I18N.get('record-date', pack), I18N.format('record-date-format', pack, 
      I18N.get('day-' + record.date.dayName.toLowerCase(), datePack),
      parseInt(record.date.day, 10),
      I18N.get('month-' + record.date.month, datePack),
      record.date.year), 1.2);

    this.addTextLine(I18N.get('record-theater', pack), record.theater ? record.theater : I18N.get('record-not-available', pack), 1.7);
    this.addLine(0.3, 8, 1.9, 0.01);
    let y = 2.2;        
    record.pieces.forEach(piece => {
      Object.keys(piece).forEach(key => {
        this.addTextLine(I18N.get('record-' + key, pack), piece[key], y);
        y += 0.5;
      });  
      y -= 0.3;
      this.addLine(0.3, 8, y, 0.01);  
      y += 0.4;
    });
    this.addTextLine(I18N.get('record-receipts', pack), I18N.format('record-pounds', pack, record.receipts), y);
    y += 0.3;
    this.pdf.setFontSize(12);
    Object.keys(record.entries).forEach(entry => {
      this.addSmallTextLine(I18N.get('record-' + entry, pack), 
        I18N.format('record-audiences', pack, record.entries[entry].quantity), 
        record.entries[entry].price,
        record.entries[entry].total,
        y);
      y += 0.3;
    });
    this.pdf.save(name + '.pdf');    
  }

  addLine(x1, x2, y, width) {
    this.pdf.setLineWidth(width);
    this.pdf.line(x1, y, x2, y);
    this.pdf.setLineWidth(1);
  }

  addTextLine(label, value, y) {
    this.pdf.setFontStyle('bold');
    this.pdf.text(label, 0.3, y);
    this.pdf.setFontStyle('normal');
    this.pdf.text(' : ', 2, y);
    this.pdf.text(value, 2.5, y);
  }

  addSmallTextLine(label, count, price, total, y) {
    this.pdf.setFontStyle('bold');
    this.pdf.text(label, 0.3, y);
    this.pdf.setFontStyle('normal');
    this.pdf.text(' : ', 2, y);
    this.pdf.text(count, 2.5, y);
    this.pdf.text(' X ', 4, y);
    this.pdf.text(price, 4.5, y);
    this.pdf.text(' = ', 5.5, y);
    this.pdf.text(total, 6, y);
  }
}

export default PDFGenerator