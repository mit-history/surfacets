import jsPDF from 'jspdf';
import I18N from './i18n';
import datePack from './date.i18n.json';

class PDFGenerator {
  constructor() {
    this.pdf = new jsPDF({unit: 'in'});
    this.y = 0;
  }

  saveRecord(record, pack, name) {
    this.pdf.text(I18N.format('record-title', pack, record.entry), 0.3, 0.42);
    this.pdf.text(`${record.number} / ${record.total}`, 6.8, 0.42);
    this.addLine(0, 8.5, 0.75, 0.05);
    this.y = this.addTextLine(I18N.get('record-date', pack), I18N.format('record-date-format', pack,
      I18N.get('day-' + record.date.dayName.toLowerCase(), datePack),
      parseInt(record.date.day, 10),
      I18N.get('month-' + record.date.month, datePack),
      record.date.year), 1.2);

    this.y = this.addTextLine(I18N.get('record-theater', pack), record.theater ? record.theater : I18N.get('record-not-available', pack), this.y + 0.5);
    this.addLine(0.3, 8, this.y + 0.2, 0.01);
    this.y +=  0.6;
    record.pieces.forEach(piece => {
      Object.keys(piece).forEach(key => {
        this.y = this.addTextLine(I18N.get('record-' + key, pack), piece[key], this.y);
        this.y += 0.5;
      });
      this.y -= 0.3;
      this.addLine(0.3, 8, this.y, 0.01);
      this.y += 0.4;
      this.checkPage();
    });
    this.y = this.addTextLine(I18N.get('record-receipts', pack), I18N.format('record-pounds', pack, record.receipts), this.y);
    this.y += 0.3;
    this.checkPage();
    this.pdf.setFontSize(12);
    Object.keys(record.entries).forEach(entry => {
      var qty = entry.includes('lodge') ? 'x' : record.entries[entry].quantity;
      this.y = this.addSmallTextLine(pack['record-' + entry] ? I18N.get('record-' + entry, pack) : entry,
        I18N.format('record-audiences', pack, qty),
        record.entries[entry].price,
        record.entries[entry].total,
        this.y);
      this.y += 0.3;
      this.checkPage();
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
    // Iterate lines to show whole value
    var nextLine = true;
    for (var i = 0; nextLine; i = i + 50) {
      var endOfLine = i + 50
      var subValue = value.substring(i, endOfLine).trim();
      this.pdf.text(subValue + (value.length > endOfLine ? '-' : ''), 2.5, y);
      if (value.length > endOfLine) {
        y = y + 0.25;
      } else {
        nextLine = false;
      }
    }
    return y;
  }

  addSmallTextLine(label, count, price, total, y) {
    this.pdf.setFontStyle('bold');
    const MAX_LENGTH = 18;
    var subLabel = label.substring(0, MAX_LENGTH).trim();
    this.pdf.text(subLabel + (label.length > MAX_LENGTH ? '-' : ''), 0.3, y);
    this.pdf.setFontStyle('normal');
    this.pdf.text(' : ', 2, y);
    this.pdf.text(count, 2.5, y);
    this.pdf.text(' X ', 4, y);
    this.pdf.text(price, 4.5, y);
    this.pdf.text(' = ', 5.5, y);
    this.pdf.text(total, 6, y);
    if (label.length > 20) {
      this.pdf.setFontStyle('bold');
      var nextLine = true;
      y = y + 0.25;
      for (var i = MAX_LENGTH; nextLine; i = i + MAX_LENGTH) {
        var endOfLine = i + MAX_LENGTH;
        var subLabel = label.substring(i, endOfLine).trim();
        console.log('subLabel', subLabel);
        this.pdf.text(subLabel + (label.length > endOfLine ? '-' : ''), 0.3, y);
        if (label.length > endOfLine) {
          y = y + 0.25;
        } else {
          nextLine = false;
        }
      }
      this.pdf.setFontStyle('normal');
    }
    return y;
  }

  addEllipsis(text, count) {
    return text.length > count ? `${text.substr(0, count - 1)} ...` : text;
  }

  checkPage() {
    if (this.y >= 11.0) {
      this.y = 0.42;
      this.pdf.addPage();
    }
  }
}

export default PDFGenerator