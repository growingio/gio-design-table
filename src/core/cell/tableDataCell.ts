import { InteractionOptions } from '@antv/s2';
import { CustomDataCell } from './dataCell';

export class CustomTableDataCell extends CustomDataCell {
  protected drawTextShape() {
    super.drawTextShape();
    this.drawLinkFieldShape();
  }

  protected drawLinkFieldShape() {
    const { linkFields = [] } = this.spreadsheet.options.interaction as InteractionOptions;
    const linkTextFill = this.theme.rowCell?.text?.linkTextFill || '';

    super.drawLinkFieldShape(
      linkFields.includes(this.meta.valueField),
      linkTextFill,
    );
  }

  protected drawBorderShape() {
    super.drawBorderShape();
    if (this.meta.colIndex === 0) {
      this.drawLeftBorder();
    }
  }
}
