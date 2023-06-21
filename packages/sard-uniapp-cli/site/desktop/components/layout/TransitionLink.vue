import { useTransition, MouseEvent, useCallback } from 'react' import { NavLink,
NavLinkProps } from 'react-router-dom' export default function
TransitionLink(props: NavLinkProps) { const { onClick, ...rest } = props const
[isPending, startTransition] = useTransition() console.log(isPending) const
handleClick = (event: MouseEvent) => { console.log('click', event)
startTransition(() => { onClick?.(event) }) } return
<NavLink {...rest} onClick="{handleClick}"></NavLink>
}
