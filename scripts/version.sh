#!/bin/bash

# Version Update Script for Turbo Repo Packages
# Usage: ./scripts/version.sh --package <package-name> <version>
# Example: ./scripts/version.sh --package hooks 0.1.0

set -e

# Default values
PACKAGE=""
VERSION=""
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_error() {
    echo -e "${RED}Error: $1${NC}" >&2
}

print_success() {
    echo -e "${GREEN}Success: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
}

print_usage() {
    echo "Usage: $0 --package <package-name> <version>"
    echo ""
    echo "Examples:"
    echo "  $0 --package hooks 0.1.0"
    echo "  $0 --package components 1.2.3"
    echo "  $0 --package server 2.0.0-beta.1"
    echo ""
    echo "Available packages:"
    find "$REPO_ROOT/packages" -name "package.json" -exec dirname {} \; | sed "s|$REPO_ROOT/packages/||" | grep -E "^@enotion/" | sed "s|@enotion/||" | sort
}

# Validate version format (basic semver check)
validate_version() {
    local version="$1"
    if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$ ]]; then
        return 1
    fi
    return 0
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --package)
            PACKAGE="$2"
            shift 2
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            if [[ -z "$VERSION" && -n "$PACKAGE" ]]; then
                VERSION="$1"
                shift
            else
                print_error "Unknown argument: $1"
                print_usage
                exit 1
            fi
            ;;
    esac
done

# Validate required arguments
if [[ -z "$PACKAGE" ]]; then
    print_error "Package name is required"
    print_usage
    exit 1
fi

if [[ -z "$VERSION" ]]; then
    print_error "Version is required"
    print_usage
    exit 1
fi

# Validate version format
if ! validate_version "$VERSION"; then
    print_error "Invalid version format: $VERSION"
    echo "Version must follow semantic versioning (e.g., 1.0.0, 2.1.3-beta.1)"
    exit 1
fi

# Construct package path
PACKAGE_PATH="$REPO_ROOT/packages/@enotion/$PACKAGE"
PACKAGE_JSON="$PACKAGE_PATH/package.json"

# Check if package exists
if [[ ! -d "$PACKAGE_PATH" ]]; then
    print_error "Package '@enotion/$PACKAGE' not found at $PACKAGE_PATH"
    echo ""
    print_usage
    exit 1
fi

# Check if package.json exists
if [[ ! -f "$PACKAGE_JSON" ]]; then
    print_error "package.json not found at $PACKAGE_JSON"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('$PACKAGE_JSON').version" 2>/dev/null || echo "unknown")

echo "Updating @enotion/$PACKAGE:"
echo "  Current version: $CURRENT_VERSION"
echo "  New version: $VERSION"
echo ""

# Confirm the update
read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Update the version using node to preserve JSON formatting
node -e "
const fs = require('fs');
const path = '$PACKAGE_JSON';
const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
pkg.version = '$VERSION';
fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
"

# Verify the update
NEW_VERSION=$(node -p "require('$PACKAGE_JSON').version" 2>/dev/null || echo "error")

if [[ "$NEW_VERSION" == "$VERSION" ]]; then
    print_success "Updated @enotion/$PACKAGE to version $VERSION"

    # Optional: Run build to ensure everything still works
    echo ""
    read -p "Run build for this package to verify? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Building @enotion/$PACKAGE..."
        cd "$REPO_ROOT"
        if pnpm --filter "@enotion/$PACKAGE" build; then
            print_success "Build completed successfully"
        else
            print_warning "Build failed - you may need to fix issues before publishing"
        fi
    fi
else
    print_error "Failed to update version. Expected $VERSION, got $NEW_VERSION"
    exit 1
fi
