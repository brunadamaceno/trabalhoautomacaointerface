export type User = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const newUser = (): User => {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return { name: `QA User ${suffix}`, email: `qa.automation.${suffix}@example.com`, password: 'Automation@123', firstName: 'QA', lastName: `Automation${suffix}` };
};
