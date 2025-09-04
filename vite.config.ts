import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcssPresetEnv from 'postcss-preset-env'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    // Vue3等插件hooks自动引入
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core' ],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver(),
      ],
    }),
    // 按需对应的组件库及样式
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      // types: [{
      //   from: 'vue-router',
      //   names: ['RouterLink', 'RouterView']
      // }]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    // stylelint(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]'
    })
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      // scss 全局变量的配置 
      scss: {
        silenceDeprecations: ['legacy-js-api'],
        // additionalData: '@use "@/assets/styles/variable.scss" as *;',
        additionalData: '@use "@/assets/styles/index.scss" as *;',
      },
    },
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  },
})
