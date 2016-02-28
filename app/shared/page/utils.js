export function getActionType(resource, actionType) {
  return `${resource}_${actionType}`
}

export function getPageKey(resource) {
  return `${resource}Page`
}
