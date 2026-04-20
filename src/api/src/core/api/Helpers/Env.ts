export class Env {
    public static get (key:string, default_value = null) {
        return process.env[key] ?? default_value;
    }
}