<!-- <script>
	import Toggle from '$lib/components/Buttons/toggle.svelte';
	import ImgTamplate from '$lib/components/Profil_Work_SiteBuilder/2_image/imgTamplate.svelte';
  import { AlertDialog } from "bits-ui";
</script>

<h1>test</h1>
<div style="display: flex; justify-content: center;align-items: center">
	<Toggle on:toggle={() => console.log('toggled')}></Toggle>
</div> -->

<script lang="ts">
	import { AlertDialog, Switch } from 'bits-ui';
	//import { flyAndScale } from "@/utils/index.js";
	import { fade } from 'svelte/transition';
  let checked = true;
</script>

<div style="display: flex; justify-content: center;align-items: center">
	<AlertDialog.Root>
		<AlertDialog.Trigger
			class="inline-flex h-12 items-center
  justify-center whitespace-nowrap rounded-input bg-dark px-[21px]
  text-[15px] font-semibold text-background shadow-mini transition-all hover:bg-dark/95 active:scale-98"
		>
			Subscribe
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay
				transition={fade}
				transitionConfig={{ duration: 150 }}
				class="fixed inset-0 z-50 bg-black/80"
			/>
			<AlertDialog.Content
				class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-card-lg border bg-background p-7 shadow-popover outline-none sm:max-w-lg md:w-full"
			>
				<div class="flex flex-col gap-4 pb-6">
					<AlertDialog.Title class="text-lg font-semibold tracking-tight"
						>Confirm your transaction</AlertDialog.Title
					>
					<AlertDialog.Description class="text-sm text-foreground-alt">
						This action cannot be undone. This will initiate a monthly wire in the amount of $10,000
						to Huntabyte. Do you wish to continue?
					</AlertDialog.Description>
				</div>
				<div class="flex w-full items-center justify-center gap-2">
					<AlertDialog.Cancel
						class="inline-flex h-input w-full items-center justify-center rounded-input bg-muted text-[15px] font-medium shadow-mini transition-all hover:bg-dark-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
						>Cancel</AlertDialog.Cancel
					>
					<AlertDialog.Action
						class="inline-flex h-input w-full items-center justify-center rounded-input bg-dark text-[15px] font-semibold text-background shadow-mini transition-all hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
						>Continue</AlertDialog.Action
					>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>

  {checked}

   
  <Switch.Root checked={checked}>
    <Switch.Thumb />
    <Switch.Input />
  </Switch.Root>
</div>
