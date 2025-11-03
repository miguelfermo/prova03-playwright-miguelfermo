import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class EngeplusElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getOpcaoSelect(): Locator {
    return this.page.locator(
      'xpath=/html/body/div/div/div[1]/div/div[1]/form/div[1]/div/select'
    );
  }

  getNomeField(): Locator {
    return this.page.locator(
      'xpath=/html/body/div/div/div[1]/div/div[1]/form/div[2]/div/input'
    );
  }

  getEmailField(): Locator {
    return this.page.locator(
      'xpath=/html/body/div/div/div[1]/div/div[1]/form/div[3]/div/input'
    );
  }

  getTelefoneField(): Locator {
    return this.page.locator(
      'xpath=/html/body/div/div/div[1]/div/div[1]/form/div[4]/div/input'
    );
  }

  getMensagemField(): Locator {
    return this.page.locator(
      'xpath=/html/body/div/div/div[1]/div/div[1]/form/div[5]/div/textarea'
    );
  }

  getEnviarButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  getMensagemSucesso(): Locator {
    return this.page.locator('text=enviada com sucesso');
  }
}
