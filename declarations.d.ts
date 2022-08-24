// declare module '*.scss';
// declare module '*.css';
declare module '*.png';

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
