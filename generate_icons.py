#!/usr/bin/env python3
"""
Simple icon generator for PWA
Creates PNG icons in different sizes from SVG
"""

import os
import subprocess

def generate_icons():
    """Generate PNG icons from SVG using built-in tools"""
    
    # Icon sizes needed for PWA
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    svg_path = "icons/icon.svg"
    
    if not os.path.exists(svg_path):
        print(f"SVG file not found: {svg_path}")
        return
    
    # Try to use built-in macOS tools
    for size in sizes:
        output_path = f"icons/icon-{size}x{size}.png"
        
        # Use qlmanage (macOS built-in) to convert SVG to PNG
        try:
            cmd = [
                "qlmanage", 
                "-t", "-s", str(size), 
                "-o", "icons/",
                svg_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                # Rename the generated file
                generated_name = f"icons/{os.path.basename(svg_path)}.png"
                if os.path.exists(generated_name):
                    os.rename(generated_name, output_path)
                    print(f"✅ Generated {output_path}")
                else:
                    print(f"❌ Failed to generate {output_path}")
            else:
                print(f"❌ Error generating {size}x{size}: {result.stderr}")
                
        except FileNotFoundError:
            print("❌ qlmanage not found. Using alternative method...")
            # Create a simple colored square as fallback
            create_simple_icon(size, output_path)
    
    # Create Apple touch icon (special naming)
    apple_icon_path = "icons/apple-touch-icon.png"
    if os.path.exists("icons/icon-180x180.png"):
        os.system(f"cp icons/icon-180x180.png {apple_icon_path}")
    elif os.path.exists("icons/icon-192x192.png"):
        os.system(f"cp icons/icon-192x192.png {apple_icon_path}")
    
    # Create favicons
    if os.path.exists("icons/icon-32x32.png"):
        os.system("cp icons/icon-32x32.png icons/favicon-32x32.png")
    if os.path.exists("icons/icon-16x16.png"):
        os.system("cp icons/icon-16x16.png icons/favicon-16x16.png")

def create_simple_icon(size, output_path):
    """Create a simple colored icon as fallback"""
    # Create a simple colored square using ImageMagick if available
    try:
        cmd = [
            "convert", 
            "-size", f"{size}x{size}",
            "xc:#4285F4",
            "-fill", "white",
            "-gravity", "center",
            "-pointsize", str(size//8),
            "-annotate", "0", "Aa",
            output_path
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode == 0:
            print(f"✅ Generated simple icon {output_path}")
        else:
            print(f"❌ Could not generate {output_path}")
    except FileNotFoundError:
        print(f"❌ No icon generation tools available for {output_path}")

if __name__ == "__main__":
    generate_icons()