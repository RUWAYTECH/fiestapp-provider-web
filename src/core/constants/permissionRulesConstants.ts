const actions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
  CANCEL: 'cancel',
  REPORT: 'report',
  SEARCH: 'search',
  PRINT: 'print',
  OP1: 'op1',
  OP2: 'op2',
  OP3: 'op3',
  OP4: 'op4',
  OP5: 'op5',
  OP6: 'op6',
  OP7: 'op7',
  OP8: 'op8',
  OP9: 'op9',
  OP10: 'op10',
}

const resources = {
  INVENTORY: 'WEB002.0000000001',
}

interface Resources {
  [key: string]: any;
}

interface Actions {
  [key: string]: any;
}

const createPermissionRules = ({ resource, action }: { resource: string; action: string }): string => {
  return `${resource}.${action}`;
};


const autoGeneratePermissionConstants = (_resources: Resources, _actions: Actions): { [key: string]: string } => {
  const constantSymbol = '_';
  const rulePermissions: { [key: string]: string } = {};

  Object.keys(_resources).forEach((resource) => {
    Object.keys(_actions).forEach((action) => {
      const rule = createPermissionRules({ resource, action });
      const key = rule.replace('.', constantSymbol).toUpperCase();

      rulePermissions[key] = `${_resources[resource as keyof typeof _resources]}.${action.toLocaleLowerCase()}`;
    });
  });
  return rulePermissions;
};

// Generar permisos
const permissions = autoGeneratePermissionConstants(resources, actions);

export default permissions;