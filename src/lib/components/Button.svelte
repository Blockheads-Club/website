<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { IconName } from '$lib/icons';
  import Icon from './Icon.svelte';

  type Props = {
    href?: string;
    variant?: 'default' | 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: IconName;
    iconEnd?: IconName;
    iconOnly?: boolean;
    hero?: boolean;
    class?: string;
    rel?: string;
    el?: HTMLElement;
    children?: Snippet;
  } & Omit<HTMLAttributes<HTMLElement>, 'class' | 'children'>;

  let {
    href,
    variant = 'default',
    size = 'md',
    icon,
    iconEnd,
    iconOnly = false,
    hero = false,
    class: className = '',
    el = $bindable(),
    children,
    ...rest
  }: Props = $props();

  const classes = $derived([
    'btn',
    variant === 'primary' && 'btn-p',
    variant === 'ghost' && 'btn-g',
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    iconOnly && 'btn-ic',
    hero && 'btn-hero',
    className
  ]);
</script>

{#snippet inner()}
  {#if icon}<Icon name={icon} />{/if}
  {@render children?.()}
  {#if iconEnd}<Icon name={iconEnd} />{/if}
{/snippet}

{#if href}
  <a bind:this={el} {href} class={classes} {...rest}>{@render inner()}</a>
{:else}
  <button bind:this={el} type="button" class={classes} {...rest}>{@render inner()}</button>
{/if}
