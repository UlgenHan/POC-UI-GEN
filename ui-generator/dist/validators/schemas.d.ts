import { z } from 'zod';
export declare const propSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["string", "number", "boolean", "any"]>>;
    required: z.ZodDefault<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "string" | "number" | "boolean" | "any";
    required: boolean;
    default?: any;
}, {
    name: string;
    type?: "string" | "number" | "boolean" | "any" | undefined;
    required?: boolean | undefined;
    default?: any;
}>;
export declare const componentManifestSchema: z.ZodObject<{
    name: z.ZodString;
    importPath: z.ZodString;
    props: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["string", "number", "boolean", "any"]>>;
        required: z.ZodDefault<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "string" | "number" | "boolean" | "any";
        required: boolean;
        default?: any;
    }, {
        name: string;
        type?: "string" | "number" | "boolean" | "any" | undefined;
        required?: boolean | undefined;
        default?: any;
    }>, "many">>;
    events: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    slots: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    importPath: string;
    props: {
        name: string;
        type: "string" | "number" | "boolean" | "any";
        required: boolean;
        default?: any;
    }[];
    events: string[];
    slots: string[];
}, {
    name: string;
    importPath: string;
    props?: {
        name: string;
        type?: "string" | "number" | "boolean" | "any" | undefined;
        required?: boolean | undefined;
        default?: any;
    }[] | undefined;
    events?: string[] | undefined;
    slots?: string[] | undefined;
}>;
export declare const dataSourceSchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["rest"]>>;
    endpoint: z.ZodString;
    method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH", "DELETE"]>>;
}, "strip", z.ZodTypeAny, {
    type: "rest";
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}, {
    endpoint: string;
    type?: "rest" | undefined;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
}>;
export declare const pageComponentInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    props: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dataSource: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["rest"]>>;
        endpoint: z.ZodString;
        method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH", "DELETE"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "rest";
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    }, {
        endpoint: string;
        type?: "rest" | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
    }>>;
    events: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        action: z.ZodDefault<z.ZodEnum<["navigate", "apiCall", "updateState"]>>;
        params: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        params: Record<string, any>;
        action: "navigate" | "apiCall" | "updateState";
    }, {
        params?: Record<string, any> | undefined;
        action?: "navigate" | "apiCall" | "updateState" | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    props: Record<string, any>;
    id: string;
    events?: Record<string, {
        params: Record<string, any>;
        action: "navigate" | "apiCall" | "updateState";
    }> | undefined;
    dataSource?: {
        type: "rest";
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    } | undefined;
}, {
    type: string;
    id: string;
    props?: Record<string, any> | undefined;
    events?: Record<string, {
        params?: Record<string, any> | undefined;
        action?: "navigate" | "apiCall" | "updateState" | undefined;
    }> | undefined;
    dataSource?: {
        endpoint: string;
        type?: "rest" | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
    } | undefined;
}>;
export declare const pageSchema: z.ZodObject<{
    name: z.ZodString;
    route: z.ZodString;
    layout: z.ZodOptional<z.ZodString>;
    components: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        props: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
        dataSource: z.ZodOptional<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<["rest"]>>;
            endpoint: z.ZodString;
            method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH", "DELETE"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "rest";
            endpoint: string;
            method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        }, {
            endpoint: string;
            type?: "rest" | undefined;
            method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
        }>>;
        events: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            action: z.ZodDefault<z.ZodEnum<["navigate", "apiCall", "updateState"]>>;
            params: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            params: Record<string, any>;
            action: "navigate" | "apiCall" | "updateState";
        }, {
            params?: Record<string, any> | undefined;
            action?: "navigate" | "apiCall" | "updateState" | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        props: Record<string, any>;
        id: string;
        events?: Record<string, {
            params: Record<string, any>;
            action: "navigate" | "apiCall" | "updateState";
        }> | undefined;
        dataSource?: {
            type: "rest";
            endpoint: string;
            method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        } | undefined;
    }, {
        type: string;
        id: string;
        props?: Record<string, any> | undefined;
        events?: Record<string, {
            params?: Record<string, any> | undefined;
            action?: "navigate" | "apiCall" | "updateState" | undefined;
        }> | undefined;
        dataSource?: {
            endpoint: string;
            type?: "rest" | undefined;
            method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    route: string;
    components: {
        type: string;
        props: Record<string, any>;
        id: string;
        events?: Record<string, {
            params: Record<string, any>;
            action: "navigate" | "apiCall" | "updateState";
        }> | undefined;
        dataSource?: {
            type: "rest";
            endpoint: string;
            method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        } | undefined;
    }[];
    layout?: string | undefined;
}, {
    name: string;
    route: string;
    components: {
        type: string;
        id: string;
        props?: Record<string, any> | undefined;
        events?: Record<string, {
            params?: Record<string, any> | undefined;
            action?: "navigate" | "apiCall" | "updateState" | undefined;
        }> | undefined;
        dataSource?: {
            endpoint: string;
            type?: "rest" | undefined;
            method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
        } | undefined;
    }[];
    layout?: string | undefined;
}>;
export declare const serviceMethodSchema: z.ZodObject<{
    name: z.ZodString;
    endpoint: z.ZodString;
    method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH", "DELETE"]>>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    payload?: Record<string, any> | undefined;
}, {
    name: string;
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
    payload?: Record<string, any> | undefined;
}>;
export declare const serviceSchema: z.ZodObject<{
    name: z.ZodString;
    methods: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        endpoint: z.ZodString;
        method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH", "DELETE"]>>;
        payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        payload?: Record<string, any> | undefined;
    }, {
        name: string;
        endpoint: string;
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
        payload?: Record<string, any> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    methods: {
        name: string;
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        payload?: Record<string, any> | undefined;
    }[];
}, {
    name: string;
    methods: {
        name: string;
        endpoint: string;
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
        payload?: Record<string, any> | undefined;
    }[];
}>;
export declare const projectSchema: z.ZodObject<{
    name: z.ZodString;
    outputDir: z.ZodDefault<z.ZodString>;
    apiBaseUrl: z.ZodDefault<z.ZodString>;
    theme: z.ZodOptional<z.ZodString>;
    componentsPath: z.ZodDefault<z.ZodString>;
    preserveRegions: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    outputDir: string;
    apiBaseUrl: string;
    componentsPath: string;
    preserveRegions: boolean;
    theme?: string | undefined;
}, {
    name: string;
    outputDir?: string | undefined;
    apiBaseUrl?: string | undefined;
    theme?: string | undefined;
    componentsPath?: string | undefined;
    preserveRegions?: boolean | undefined;
}>;
export type ComponentManifest = z.infer<typeof componentManifestSchema>;
export type ProjectConfig = z.infer<typeof projectSchema>;
export type PageConfig = z.infer<typeof pageSchema>;
export type ServiceConfig = z.infer<typeof serviceSchema>;
