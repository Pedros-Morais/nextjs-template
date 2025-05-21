declare module 'i18next-resources-to-backend' {
  import { BackendModule } from 'i18next';
  
  type LoadPathFunction = (language: string, namespace: string) => Promise<any>;
  
  export default function resourcesToBackend(loadPath: LoadPathFunction): BackendModule;
}
