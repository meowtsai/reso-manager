export const checkPermissions = (permissions, resource, op) => {
  //return true;
  const filteredPerm = permissions.filter(
    (perm) => perm.resource.resourceName === resource
  )[0];
  //console.log("checkPermissions", filteredPerm);
  if (filteredPerm && filteredPerm.operations.indexOf(op) > -1) {
    return true;
  }
  return false;
};
