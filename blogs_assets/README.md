# blogs_assets/

Store all blog post images here.

## Naming Convention

```
blog-{slug}-hero.{ext}       — Hero / banner image (wide, 1200×630px recommended)
blog-{slug}-{section}.{ext}  — Section images within the article
```

## Current Posts & Their Image Slots

### Post 1 — Transformers from Scratch
slug: `transformers-from-scratch`

| Filename | Used in | Description |
|---|---|---|
| `blog-transformers-hero.png` | Hero banner | Architecture diagram or attention heatmap |
| `blog-transformers-attention.png` | Section: Self-Attention | Visual of Q·K·V attention computation |
| `blog-transformers-encoder.png` | Section: Encoder Stack | Encoder block diagram |

### Post 2 — Fine-Tuning LLMs with LoRA
slug: `lora-fine-tuning`

| Filename | Used in | Description |
|---|---|---|
| `blog-lora-hero.png` | Hero banner | Fine-tuning concept illustration |
| `blog-lora-diagram.png` | Section: LoRA Explained | Low-rank decomposition diagram (W = A·B) |
| `blog-lora-loss.png` | Section: Training | Training/validation loss curve |

## Adding a New Post

1. Add images here with the naming pattern above.
2. Copy `blog-post-template.html` → rename to `blog-{slug}.html`.
3. Fill in the `<!-- TEMPLATE: ... -->` placeholders.
4. Add a card in `blogs.html` using the existing card HTML pattern.
