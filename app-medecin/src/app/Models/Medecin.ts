export interface Medecin {
    resourceType: string;
    id: string;
    text?: {
      status: string;
      div?: any;  // Si vous avez une structure HTML ici, vous pouvez la définir ou utiliser `any`.
    };
    identifier: {
      use: string;
      system: string;
      value: string;
    }[];
    name: {
      use?: string;
      family: string;
      given: string[];
      prefix?: string[];
      suffix?: string[];
    }[];
    telecom?: {
      system: string;
      value: string;
      use: string;
    }[];
    gender: string;
    birthDate: string;
    address?: {
      use: string;
      line: string[];
      city: string;
      postalCode: string;
      country: string;
    }[];
    qualification?: {
      code: {
        coding: {
          system: string;
          code: string;
          display: string;
        }[];
      };
    }[];
    active?: boolean;
  }
  