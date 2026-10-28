# Agent Guidelines for Julian's Vegan Recipe Collection

This is a Jekyll-based static site for a personal vegan recipe collection in German. Recipes are stored as Markdown files with YAML frontmatter in a Jekyll collection.

## Project Structure

```
cooking/
├── _config.yml              # Jekyll configuration with collection definition
├── index.md                 # Main page with recipe index
├── _recipes/                # Recipe collection (Markdown + YAML frontmatter)
│   ├── mapo-tofu.md
│   ├── semmelknoedel.md
│   └── ...
├── _layouts/
│   ├── default.html         # Shared shell (head, header, main, footer, stylesheet)
│   └── rezept.html          # Recipe page (uses default.html), servings stepper markup
├── assets/
│   ├── css/style.css        # Site styling (Solarized light + dark, print)
│   ├── fonts/               # Self-hosted Newsreader (OFL, see OFL.txt)
│   └── js/servings.js       # Serving calculator (scales data-amount values)
└── scripts/
    └── to-json.js          # Optional: export recipes to JSON
```

## Build & Serve Commands

```bash
# Set Ruby version (requires Ruby 3.0+)
export PATH="$HOME/.rubies/ruby-4.0.2/bin:$PATH"

# Install dependencies (requires Ruby and Bundler)
bundle install

# Serve site locally with live reload
bundle exec jekyll serve

# Serve with specific port
bundle exec jekyll serve --port 4000

# Build for production
bundle exec jekyll build

# Build with future-dated posts
bundle exec jekyll build --future
```

## Testing

```bash
# Validate site builds without errors
bundle exec jekyll build

# Check for dead links (if html-proofer is installed)
bundle exec jekyll build && htmlproofer ./_site
```

## Code Style Guidelines

### Recipe Files (Markdown with YAML Frontmatter)

**File Naming Convention:**
- Use lowercase with hyphens: `semmelknoedel.md`
- German umlauts converted: `ä` → `ae`, `ö` → `oe`, `ü` → `ue`, `ß` → `ss`

**Required Frontmatter:**
```yaml
---
title: "Rezept Name"
category: hauptgerichte  # hauptgerichte, vorspeise, desserts, backrezepte, getraenke
cooked: true             # true = shown by default, omit or false = hidden
servings: 4              # number of people
ingredients:             # list of ingredients
  - amount: 400
    unit: g
    item: Tofu
instructions:           # list of steps (strings)
  - "First step..."
  - "Second step..."
notes: []                # optional tips
source: []               # optional sources
---
```

**Standard Recipe Structure:**
```markdown
# Recipe Title (auto-generated from frontmatter, not needed)

Optional intro text after frontmatter...
```

### CSS Guidelines

**Theme:** Solarized Light

- CSS variables defined with `--` prefix
- 4-space indentation
- Use defined color palette variables, not hardcoded hex values

**Color Palette:**
```css
--base03: #002b36;  --base02: #073642;  --base01: #586e75;  --base00: #657b83;
--base0:  #839496;  --base1:  #93a1a1;  --base2:  #eee8d5;  --base3:  #fdf6e3;
--yellow: #b58900;  --orange: #cb4b16;  --red:    #dc322f;  --magenta:#d33682;
--violet: #6c71c4;  --blue:   #268bd2;  --cyan:   #2aa198;  --green:  #859900;
```

### YAML Configuration

- Use lowercase for keys: `title:`, not `Title:`
- Boolean values: `true` / `false` (lowercase)
- Empty arrays: `[]`

## Adding New Recipes

1. Create `_recipes/recipe-name.md` with frontmatter
2. Set `cooked: false` if not yet cooked (hidden by default)
3. Update `index.md` automatically lists all recipes by category
4. Commit with message: `Add recipe for [dish name]`

## Workflow

```bash
# 1. Edit/create recipe files in _recipes/
# 2. Run local server to preview
bundle exec jekyll serve

# 3. Commit changes
git add -A && git commit -m "Add recipe for X"

# 4. Push to GitHub (GitHub Pages auto-builds)
git push
```

## Future Features

- **Unit conversion**: g ↔ kg, ml ↔ l
- **JSON export**: Run `node scripts/to-json.js` to export all recipes to `_data/recipes.json`

## Notes for Agents

- This is a static site - no JavaScript testing needed
- The site is in German - maintain German language throughout
- Use Jekyll collections for all recipe data
- The `cooked` filter on index page is client-side JavaScript
- Index categories come from one list in `index.md`; empty categories are hidden
- Always link assets with `relative_url`; only `default.html` links the stylesheet
- Serving calculator needs numeric `amount` values (ranges like `3-4` are supported); empty amounts are left as-is
