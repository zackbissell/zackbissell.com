# 🪄 Magic MCP Server Setup Guide

## Overview
This guide helps you integrate the **@21st-dev/magic** MCP server with Claude Code to unlock revolutionary development capabilities for the Zack Bissell immersive storytelling platform.

## Prerequisites
- Claude Code installed and running
- Access to Claude Code settings/configuration
- Valid @21st-dev/magic API key (provided in configuration)

## Setup Instructions

### Option 1: Add to Claude Code Settings

1. **Open Claude Code Settings**
   - Access Claude Code settings/preferences
   - Look for "MCP Servers" or "Extensions" section

2. **Add MCP Server Configuration**
   - Add the following configuration to your MCP servers list:
   ```json
   {
     "@21st-dev/magic": {
       "command": "npx",
       "args": [
         "-y",
         "@21st-dev/magic@latest",
         "API_KEY=\"860d30c7c122af901b14de8ff6ebe5535fe714f92d69102a40e4bf258cf44686\""
       ]
     }
   }
   ```

3. **Restart Claude Code**
   - Close and reopen Claude Code
   - The Magic MCP server should now be available

### Option 2: Configuration File Method

1. **Copy Configuration**
   - Use the provided `claude-mcp-config.json` file in this project
   - Copy its contents to your Claude Code MCP configuration

2. **Apply Configuration**
   - Follow your Claude Code documentation for applying MCP server configurations
   - The exact method may vary depending on your Claude Code version

## Verification

After setup, you should see:
- **@21st-dev/magic** in your available MCP servers list
- Enhanced code generation capabilities
- Advanced development tools in Claude Code

## Expected Magic MCP Server Capabilities

Once configured, the Magic MCP server will provide:

### 🚀 **Enhanced Code Generation**
- AI-powered component creation
- Smart refactoring suggestions
- Performance optimization recommendations

### 🎨 **Advanced Design Tools**
- Revolutionary UI component generation
- Animation and interaction enhancements
- Visual effect creation tools

### 🔧 **Development Acceleration**
- Intelligent debugging assistance
- Automated testing generation
- Code quality analysis

### 🌟 **Integration Benefits**
- Works alongside existing MCP servers:
  - **context7** - Library documentation
  - **sequential-thinking** - Complex problem solving
  - **memory** - Knowledge management
  - **puppeteer** - Browser automation

## Troubleshooting

### Magic Server Not Appearing
1. Verify API key is correctly formatted
2. Check internet connection
3. Ensure @21st-dev/magic package is accessible
4. Restart Claude Code completely

### Connection Issues
1. Confirm API key is valid and active
2. Check for firewall/network restrictions
3. Try running `npx @21st-dev/magic@latest` manually to test

### Performance Issues
1. Magic server may take time to initialize
2. Large projects may require additional resources
3. Consider closing other resource-intensive applications

## Integration with Revolutionary Site Features

The Magic MCP server enhances our existing revolutionary features:

### 🎵 **Audio-Reactive Components**
- Enhanced particle system generation
- Advanced audio visualization algorithms
- Performance optimization suggestions

### 🌍 **Immersive World Experiences**
- Improved Three.js component creation
- Enhanced Framer Motion animations
- Better world-specific theming

### 🎯 **Performance Optimization**
- Bundle size analysis and optimization
- Rendering performance improvements
- Memory usage optimization

## API Key Security

**Important:** The API key in this configuration is for development use. For production:
- Consider environment variable usage
- Implement key rotation practices
- Monitor usage and access logs

## Support

For Magic MCP server specific issues:
- Check @21st-dev documentation
- Review API key permissions
- Verify package version compatibility

For project-specific integration:
- Refer to project README.md
- Check existing MCP server implementations
- Review revolutionary component documentation

---

**🎉 Ready to Experience Magic-Enhanced Development!**

Once configured, the Magic MCP server will supercharge your development capabilities, making the already revolutionary Zack Bissell site even more extraordinary.