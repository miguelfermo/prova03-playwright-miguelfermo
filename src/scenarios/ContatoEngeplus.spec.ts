import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import { ai } from '@zerostep/playwright';
import EngeplusPage from '../support/pages/EngeplusPage';
import { faker } from '@faker-js/faker';

test.describe('Formulário de contato Engeplus', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let engeplusPage: EngeplusPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.engeplus')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    engeplusPage = new EngeplusPage(page);
    await page.goto(BASE_URL);
  });

  test('CT01 - Preencher formulário completo com Portal Engeplus', async () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const telefone = faker.phone.number('(##) #####-####');
    const mensagem = faker.lorem.paragraph();

    await engeplusPage.preencherFormularioCompleto(
      'Portal Engeplus',
      nome,
      email,
      telefone,
      mensagem
    );

    await engeplusPage.validarCamposPreenchidos();
    await engeplusPage.validarOpcaoSelecionada('Portal Engeplus');
  });

  test('CT02 - Preencher formulário com Engeplus Internet', async () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const telefone = faker.phone.number('(##) #####-####');
    const mensagem = faker.lorem.paragraph();

    await engeplusPage.selecionarOpcao('Engeplus Telecom');
    await engeplusPage.preencherNome(nome);
    await engeplusPage.preencherEmail(email);
    await engeplusPage.preencherTelefone(telefone);
    await engeplusPage.preencherMensagem(mensagem);

    await engeplusPage.validarCamposPreenchidos();
    await engeplusPage.validarOpcaoSelecionada('Engeplus Telecom');
  });

  test('CT03 - Preencher formulário com Engeplus Datacenter usando ZeroStep AI', async ({
    page,
  }) => {
    // Skip test se ZEROSTEP_TOKEN não estiver configurado
    test.skip(
      !process.env.ZEROSTEP_TOKEN,
      'ZEROSTEP_TOKEN não configurado - teste rodará no CI'
    );

    const aiArgs = { page, test };
    const nome = 'Miguel Teste AI';
    const email = 'miguel.teste@engeplus.com';
    const telefone = '(47) 99999-9999';
    const mensagem = 'Esta é uma mensagem de teste usando ZeroStep AI';

    // Selecionar opção usando Page Object
    await engeplusPage.selecionarOpcao('Engeplus Datacenter');

    // Usando ZeroStep AI para verificar que a página está correta antes de preencher
    await ai('Verificar que o formulário de contato está visível', aiArgs);

    // Preencher os campos
    await engeplusPage.preencherNome(nome);
    await engeplusPage.preencherEmail(email);
    await engeplusPage.preencherTelefone(telefone);
    await engeplusPage.preencherMensagem(mensagem);

    // Validação usando a page object
    await engeplusPage.validarCamposPreenchidos();
    await engeplusPage.validarOpcaoSelecionada('Engeplus Datacenter');

    // Usando ZeroStep AI para validação final
    await ai('Verificar que todos os campos do formulário estão preenchidos', aiArgs);
  });
});
