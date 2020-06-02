import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('item').insert([
    { name: 'Lâmpadas', icon: 'lampadas.svg' },
    { name: 'Pilhas e Baterias', icon: 'baterias.svg' },
    { name: 'Papéis e Papelão', icon: 'papeis-papelao.svg' },
    { name: 'Resíduos Eletrônicos', icon: 'eletronicos.svg' },
    { name: 'Resíduos Orgânicos', icon: 'organicos.svg' },
    { name: 'Óleo de Cozinha', icon: 'oleo.svg' },
  ]);
}
