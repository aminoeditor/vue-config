import VueConfig from "./VueConfig";

export default {
	install (Vue, options) {
		const vueConfig = new VueConfig(options);
		vueConfig.buildConfigs();
		Vue.prototype.$config = vueConfig;
	}
}
