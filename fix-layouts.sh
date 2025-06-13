#!/bin/bash

# Fix layout files for all games
GAMES=("lines" "price" "scatter" "ways")

for GAME in "${GAMES[@]}"; do
    echo "Fixing layout for $GAME..."
    
    LAYOUT_FILE="/Users/temogiorgadze/Documents/FluxGaming/Stake RGS/web-sdk-setup/web-sdk/apps/$GAME/src/routes/+layout.svelte"
    
    # Replace svelte:component with conditional rendering
    sed -i '' '/<svelte:component this={AuthComponent}>/,/<\/svelte:component>/ {
        s/<svelte:component this={AuthComponent}>/{#if isDev}\
\t\t<AuthenticateBypass>/
        s/<LoadI18n {messagesMap}>/<LoadI18n {messagesMap}>\
\t\t\t\t<Game \/>/
        s/<Game \/>/\t\t\t<\/LoadI18n>\
\t\t<\/AuthenticateBypass>\
\t{:else}\
\t\t<Authenticate>\
\t\t\t<LoadI18n {messagesMap}>\
\t\t\t\t<Game \/>\
\t\t\t<\/LoadI18n>\
\t\t<\/Authenticate>\
\t{\/if}/
        /<\/svelte:component>/d
    }' "$LAYOUT_FILE"
    
    echo "✓ Fixed layout for $GAME"
done

echo "All layouts fixed!"