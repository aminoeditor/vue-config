# Vue Config
## Easy config management across all vue components versioned by environment

**Install**
```
npm install --save @aminoeditor/vue-config
```

**Usage**
*main.js*

```
import Vue from 'vue';

import VueConfig from '@aminoeditor/vue-config';
import * as configList from '@/config';

Vue.use(VueConfig, {
    configList
});
```
--------

*config.js*

```
const defaults = {
    foo: 'bar',
    sub: {
        a: [{foo: 'bar'}]
    }
};

const development = {
    foo: 'dev',
    sub: {
        a: [{foo: 'baz'}]
    }
};

const production = {
    foo: 'baz'
};

export { defaults, development, production }
```

**Notes**
The config plugin will look for the following options;

```
{
    configList: {
        defaults: { }, //default configs
        [env]: { }, //config key matching the value of NODE_ENV
    }
}
```

Configs will cascade loading defaults, then overriding with configs from the specific environment file

**Accessing Configs**
*In any component*

```
<script>
{
	name: 'MyComponent',
	mounted () {
		console.log(this.$config.get('foo', 'fallback value can go here in case foo is not set')); //returns a single config top level key with getter
		console.log(this.$config.get()); //returns the entire merged config object
		console.log(this.$config.get().sub.a[0].foo); // this may be a more convenient way to access a single deep key OR
		console.log(this.$config.get('sub').a[0].foo); // this works too
	}
}
</script>
```
