let deviceStatusComponentList = import.meta.globEager('../components/deviceStatus/*.vue')
let deviceStatusCompList = []
for (let path in deviceStatusComponentList) {
    if (Object.prototype.hasOwnProperty.call(deviceStatusComponentList, path)) {
        let moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
        let moduleConfig = deviceStatusComponentList[path].default
        deviceStatusCompList.push({
            moduleName,
            moduleConfig
        })
    }
}
export {
    deviceStatusCompList
}