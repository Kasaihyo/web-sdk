<script lang="ts">
	import { fly } from 'svelte/transition';
	import config from '../game/config';
	import { eventEmitter } from '../game/eventEmitter';
	
	let collected = $state(0);
	let target = $state(config.ewCollectionTarget); // 3 EWs to upgrade multiplier
	let visible = $state(false);
	
	let progress = $derived((collected / target) * 100);
	let isComplete = $derived(collected >= target);
	
	// Reset when target is reached
	$effect(() => {
		if (isComplete) {
			// Trigger multiplier upgrade event
			setTimeout(() => {
				collected = 0; // Reset for next collection
			}, 1000);
		}
	});
	
	// Listen for EW collection events
	eventEmitter.subscribeOnMount({
		ewCollectionShow: () => {
			visible = true;
		},
		ewCollectionHide: () => {
			visible = false;
		},
		ewCollectionUpdate: ({ count, target: targetCount }) => {
			collected = count;
			if (targetCount) target = targetCount;
		}
	});
</script>

{#if visible}
	<div class="ew-tracker" transition:fly={{ y: -20, duration: 300 }}>
		<div class="ew-tracker__label">EW Collection</div>
		<div class="ew-tracker__progress">
			<div class="ew-tracker__progress-bar">
				<div 
					class="ew-tracker__progress-fill" 
					style="width: {progress}%"
					class:complete={isComplete}
				></div>
			</div>
			<div class="ew-tracker__count">
				{collected}/{target}
			</div>
		</div>
		{#if isComplete}
			<div class="ew-tracker__complete" transition:fly={{ y: 20, duration: 300 }}>
				Multiplier Upgrade!
			</div>
		{/if}
	</div>
{/if}

<style>
	.ew-tracker {
		position: absolute;
		top: 20px;
		right: 20px;
		background: rgba(0, 0, 0, 0.8);
		border: 2px solid #ff6b00;
		border-radius: 10px;
		padding: 15px 20px;
		min-width: 200px;
		font-family: inherit;
		color: white;
		z-index: 100;
	}
	
	.ew-tracker__label {
		font-size: 14px;
		text-transform: uppercase;
		margin-bottom: 8px;
		color: #ff6b00;
		font-weight: bold;
	}
	
	.ew-tracker__progress {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	
	.ew-tracker__progress-bar {
		flex: 1;
		height: 20px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	
	.ew-tracker__progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #ff6b00, #ffaa00);
		transition: width 0.3s ease;
		position: relative;
	}
	
	.ew-tracker__progress-fill.complete {
		animation: pulse 0.5s ease-in-out;
		background: linear-gradient(90deg, #00ff00, #00ff88);
	}
	
	.ew-tracker__count {
		font-size: 16px;
		font-weight: bold;
		min-width: 40px;
		text-align: right;
	}
	
	.ew-tracker__complete {
		position: absolute;
		bottom: -30px;
		left: 50%;
		transform: translateX(-50%);
		background: #00ff00;
		color: black;
		padding: 5px 15px;
		border-radius: 20px;
		font-weight: bold;
		font-size: 14px;
		white-space: nowrap;
	}
	
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
	}
	
	/* Mobile responsive */
	@media (max-width: 768px) {
		.ew-tracker {
			top: 10px;
			right: 10px;
			padding: 10px 15px;
			min-width: 150px;
		}
		
		.ew-tracker__label {
			font-size: 12px;
		}
		
		.ew-tracker__progress-bar {
			height: 16px;
		}
		
		.ew-tracker__count {
			font-size: 14px;
		}
	}
</style>