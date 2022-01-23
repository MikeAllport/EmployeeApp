import settings from "./settings.json"

// Defines the model for settings.json structure and exports it

interface ListEndpoints {
    FetchAll: string;
    Update: string;
}

interface ApiEndpoints {
    List: ListEndpoints
}

interface Settings {
    BaseUrl: string;
    ApiEndPoints: ApiEndpoints;
}

export const EnvironmentSettings = settings as Settings;