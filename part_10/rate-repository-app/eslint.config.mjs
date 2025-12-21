
// eslint.config.mjs
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat lets us reuse legacy "extends" like "eslint:recommended" and "plugin:react/recommended"
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    // Bring in the legacy shareable configs first
    ...compat.extends("eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"),

    // Then add our flat config
    {
        plugins: {
            react,
            "react-native": reactNative,
        },

        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false, // no separate .babelrc needed
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },

            // Declare RN/browser-like globals so ESLint doesn't flag them
            globals: {
                // React Native's env globals (correct path for flat config)
                ...(reactNative.environments?.["react-native"]?.globals ?? {}),

                // Explicitly add commonly used globals in RN
                __DEV__: "readonly",
                console: "readonly",
                require: "readonly",
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            // You can keep "no-undef" enabled—now that globals are declared, it will behave correctly
            // "no-undef": "error",
        },
    },
]);


  