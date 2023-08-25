/**
 * Returns a change event handler by receiving a callback
 *
 * @param callback The callback to pass the change value to.
 * We typically update some external state in here.
 *
 * @returns The change event handler
 */
export function handleChange<TElement = HTMLInputElement>(callback: (value: string) => void) {
  // @ts-ignore
  return (e: React.ChangeEvent<TElement>) => callback(e.target.value);
}
