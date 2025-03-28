/*
  This function help define the color pallete for different propertues used in the application
*/

export function ColorPalette() {
  return (<>
    <div className={"p-2 primary-background-color alternate-text-color "}>Primary Color</div>
    <div className={"p-2 secondary-background-color "}>Secondary Color</div>
    <div className={"p-2 tertiary-background-color "}>Tertiary Color</div>
    <div className={"p-2 surface-background-color "}>Surface Color</div>
    <div className={"p-2 alternate-surface-background-color "}>Alternate Surface Color</div>
    <div className={"p-2 neutral-background-color "}>Neutral Color</div>
    <div className={"p-2 alternate-neutral-background-color alternate-text-color "}>Alternate Neutral Color</div>
  </>)
}
