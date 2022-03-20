const ww = 'world';

export function hello(world: string = ww): string {
    return `Hello ${world}`;
}