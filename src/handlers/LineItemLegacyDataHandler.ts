import { MutationDeleteLineItemLegacyArgs, DeleteResponse } from '../generated';
import { DataHandler } from '.';
import { Context } from '../context';
import { GRAPHQL_ERRORS } from '../constants';

export class LineItemLegacyDataHandler extends DataHandler<'lineItemLegacy'> {
  constructor(context: Context) {
    super(context, 'lineItemLegacy');
  }

  async delete({ id }: MutationDeleteLineItemLegacyArgs): Promise<DeleteResponse> {
    const doc = await this.crud.delete({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return { message: `${doc.orderNumber} deleted.` };
  }
}
