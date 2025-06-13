#!/bin/bash

# Apply authentication bypass to all game apps
GAMES=("lines" "price" "scatter" "ways")

for GAME in "${GAMES[@]}"; do
    echo "Applying auth bypass to $GAME..."
    
    # Copy AuthenticateBypass component
    cp "/Users/temogiorgadze/Documents/FluxGaming/Stake RGS/web-sdk-setup/web-sdk/apps/cluster/src/components/AuthenticateBypass.svelte" \
       "/Users/temogiorgadze/Documents/FluxGaming/Stake RGS/web-sdk-setup/web-sdk/apps/$GAME/src/components/AuthenticateBypass.svelte"
    
    # Update the layout file
    LAYOUT_FILE="/Users/temogiorgadze/Documents/FluxGaming/Stake RGS/web-sdk-setup/web-sdk/apps/$GAME/src/routes/+layout.svelte"
    
    # Add import for AuthenticateBypass
    sed -i '' '/import { Authenticate/s/$/\nimport AuthenticateBypass from '"'"'..\/components\/AuthenticateBypass.svelte'"'"';/' "$LAYOUT_FILE"
    
    # Add isDev check
    sed -i '' '/setContext();/a\
\
	// Use bypass authentication in development\
	const isDev = import.meta.env.DEV;\
	const AuthComponent = isDev ? AuthenticateBypass : Authenticate;' "$LAYOUT_FILE"
    
    # Replace Authenticate component with dynamic component
    sed -i '' 's/<Authenticate>/<svelte:component this={AuthComponent}>/' "$LAYOUT_FILE"
    sed -i '' 's/<\/Authenticate>/<\/svelte:component>/' "$LAYOUT_FILE"
    
    echo "✓ Applied auth bypass to $GAME"
done

echo "All games updated with authentication bypass!"