// vite.config.mts
import { defineConfig, loadEnv } from "file:///workspaces/songs/journal/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///workspaces/songs/journal/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteTsconfigPaths from "file:///workspaces/songs/journal/frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { TanStackRouterVite } from "file:///workspaces/songs/journal/frontend/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    // depending on your application, base can also be "/"
    base: "",
    plugins: [
      react(),
      viteTsconfigPaths(),
      TanStackRouterVite()
    ],
    server: {
      open: true,
      // this ensures that the browser opens upon server start
      port: parseInt(process.env.VITE_PORT ?? "8080")
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3dvcmtzcGFjZXMvc29uZ3Mvam91cm5hbC9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvc29uZ3Mvam91cm5hbC9mcm9udGVuZC92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvc29uZ3Mvam91cm5hbC9mcm9udGVuZC92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHZpdGVUc2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXZpdGUtcGx1Z2luJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgICBwcm9jZXNzLmVudiA9IHsuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKX1cblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vIGRlcGVuZGluZyBvbiB5b3VyIGFwcGxpY2F0aW9uLCBiYXNlIGNhbiBhbHNvIGJlIFwiL1wiXG4gICAgICAgIGJhc2U6ICcnLFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICByZWFjdCgpLCBcbiAgICAgICAgICAgIHZpdGVUc2NvbmZpZ1BhdGhzKCksXG4gICAgICAgICAgICBUYW5TdGFja1JvdXRlclZpdGUoKVxuICAgICAgICBdLFxuICAgICAgICBzZXJ2ZXI6IHsgICAgICAgICAgICBcbiAgICAgICAgICAgIG9wZW46IHRydWUsIC8vIHRoaXMgZW5zdXJlcyB0aGF0IHRoZSBicm93c2VyIG9wZW5zIHVwb24gc2VydmVyIHN0YXJ0XG4gICAgICAgICAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5WSVRFX1BPUlQgPz8gJzgwODAnKSwgXG4gICAgICAgIH1cbiAgICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBUyxjQUFjLGVBQWU7QUFDaFUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sdUJBQXVCO0FBQzlCLFNBQVMsMEJBQTBCO0FBR25DLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFVBQVEsTUFBTSxFQUFDLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUM7QUFFOUQsU0FBTztBQUFBO0FBQUEsSUFFSCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixrQkFBa0I7QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxJQUN2QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBO0FBQUEsTUFDTixNQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWEsTUFBTTtBQUFBLElBQ2xEO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
