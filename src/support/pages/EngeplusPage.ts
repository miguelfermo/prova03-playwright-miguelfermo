import { Page, expect } from '@playwright/test';
import EngeplusElements from '../elements/EngeplusElements';
import BasePage from './BasePage';

export default class EngeplusPage extends BasePage {
  readonly engeplusElements: EngeplusElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.engeplusElements = new EngeplusElements(page);
  }

  async preencherFormularioCompleto(
    opcao: string,
    nome: string,
    email: string,
    telefone: string,
    mensagem: string
  ): Promise<void> {
    await this.engeplusElements.getOpcaoSelect().selectOption(opcao);
    await this.engeplusElements.getNomeField().fill(nome);
    await this.engeplusElements.getEmailField().fill(email);
    await this.engeplusElements.getTelefoneField().fill(telefone);
    await this.engeplusElements.getMensagemField().fill(mensagem);
  }

  async selecionarOpcao(opcao: string): Promise<void> {
    await this.engeplusElements.getOpcaoSelect().selectOption(opcao);
  }

  async preencherNome(nome: string): Promise<void> {
    await this.engeplusElements.getNomeField().fill(nome);
  }

  async preencherEmail(email: string): Promise<void> {
    await this.engeplusElements.getEmailField().fill(email);
  }

  async preencherTelefone(telefone: string): Promise<void> {
    await this.engeplusElements.getTelefoneField().fill(telefone);
  }

  async preencherMensagem(mensagem: string): Promise<void> {
    await this.engeplusElements.getMensagemField().fill(mensagem);
  }

  async clicarEnviar(): Promise<void> {
    await this.engeplusElements.getEnviarButton().click();
  }

  async validarCamposVazios(): Promise<void> {
    await expect(this.engeplusElements.getNomeField()).toBeEmpty();
    await expect(this.engeplusElements.getEmailField()).toBeEmpty();
    await expect(this.engeplusElements.getTelefoneField()).toBeEmpty();
    await expect(this.engeplusElements.getMensagemField()).toBeEmpty();
  }

  async validarCamposPreenchidos(): Promise<void> {
    await expect(this.engeplusElements.getNomeField()).not.toBeEmpty();
    await expect(this.engeplusElements.getEmailField()).not.toBeEmpty();
    await expect(this.engeplusElements.getTelefoneField()).not.toBeEmpty();
    await expect(this.engeplusElements.getMensagemField()).not.toBeEmpty();
  }

  async validarMensagemSucesso(): Promise<void> {
    await expect(this.engeplusElements.getMensagemSucesso()).toBeVisible();
  }

  async validarOpcaoSelecionada(opcao: string): Promise<void> {
    await expect(this.engeplusElements.getOpcaoSelect()).toHaveValue(opcao);
  }
}
