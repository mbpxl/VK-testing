const fromFormToServer = personInForm => ({
  type: [
    personInForm.isForeign ? 'foreign' : null,
    personInForm.isJuridical ? 'juridical' : 'physical',
  ].filter(Boolean).join('_'),
  tin: personInForm.isForeign ? null : personInForm.tin,
  name: personInForm.isJuridical ? null : personInForm.title,
  foreign_tin: personInForm.isForeign ? personInForm.tin : null,
  company_title: personInForm.isJuridical ? personInForm.title : null,
});


describe('fromFormToServer', () => {
  test('Should convert domestic juridical entity correctly', () => {
    const input = {
      isForeign: false,
      isJuridical: true,
      title: 'Company A',
      tin: '1234567890',
    };

    const expectedOutput = {
      type: "juridical",
      tin: '1234567890',
      name: null,
      foreign_tin: null,
      company_title: 'Company A',
    };

    expect(fromFormToServer(input)).toEqual(expectedOutput);
  });

  test('Should convert domestic physical person correct', () => {
    const input = {
      isForeign: false,
      isJuridical: false,
      title: 'Valera Petrov',
      tin: '09876543231',
    };

    const expectedOutput = {
      type: 'physical',
      tin: '09876543231',
      name: 'Valera Petrov',
      foreign_tin: null,
      company_title: null,
    };

    expect(fromFormToServer(input)).toEqual(expectedOutput);
  });

  test('Should convert foreign juridical entity correct', () => {
    const input = {
      isForeign: true,
      isJuridical: true,
      title: 'Company B',
      tin: '88005553535',
    };

    const expectedOutput = {
      type: 'foreign_juridical',
      tin: null,
      name: null,
      foreign_tin: '88005553535',
      company_title: 'Company B',
    };

    expect(fromFormToServer(input)).toEqual(expectedOutput);
  });

  test('Should convert foreign physical person correct', () => {
    const input = {
      isForeign: true,
      isJuridical: false,
      title: 'Petya Petkin',
      tin: '1122334455',
    };

    const expectedOutput = {
      type: 'foreign_physical',
      tin: null,
      name: 'Petya Petkin',
      foreign_tin: '1122334455',
      company_title: null,
    };

    expect(fromFormToServer(input)).toEqual(expectedOutput);
  });

  test('Should handle empty input correcr', () => {
    const input = {
      isForeign: false,
      isJuridical: false,
      title: '',
      tin: '',
    };

    const expectedOutput = {
      type: 'physical',
      tin: '',
      name: '',
      foreign_tin: null,
      company_title: null,
    };

    expect(fromFormToServer(input)).toEqual(expectedOutput);
  });
});