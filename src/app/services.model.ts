export interface ServiceInitStatus {
  serviceName: string;
  isInitialized: boolean;
}

export class DependentService {
  protected initialized: boolean = false;
  protected serviceName: string;

  constructor() {
    this.serviceName = this.constructor.name;
  }

  getServiceInitStatus(): ServiceInitStatus {
    return {
      serviceName: this.serviceName,
      isInitialized: this.initialized
    };
  }

  logServiceError(err: any): void {
    console.error(`Error in ${this.serviceName} initialization: ${err}`);
    this.initialized = false;
  }
}