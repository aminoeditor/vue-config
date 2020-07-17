const merge = require('deepmerge');
export default class {
	constructor (options) {
		this.options = options;
		this.configs = {};
		return this;
	}

	buildConfigs () {
		const { configList } = this.options;
		if (typeof configList.defaults !== "undefined") {
			this.configs = configList.defaults;
		}
		console.log(process.env.NODE_ENV);
		if (typeof configList[process.env.NODE_ENV] !== "undefined") {
			this.configs = merge(this.configs, configList[process.env.NODE_ENV], this.mergeOptions);
		}
		if (typeof configList.local !== "undefined") {
			this.configs = merge(this.configs, configList.local, this.mergeOptions);
		}
	}

	get (key, fallback) {
		if (typeof key !== "undefined") {
			return this.configs[key] || fallback;
		}

		return this.configs;
	}

	get mergeOptions () {
		return merge({
			arrayMerge: (destinationArray, sourceArray) => sourceArray
		}, this.options.merge || {});
	}
}
