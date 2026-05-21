export class Env {
    public static get (key:string, default_value = ""):string {
        return process.env[key] ?? default_value;
    }
}