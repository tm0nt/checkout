import { DefaultsInstance } from "vuetify/lib/framework.mjs";

/**
 * A few defaults that I like
 */
export const defaults: DefaultsInstance = {
	VAppBar: {
		elevation: 0,
	},
	VBtn: {
		variant: "flat",
		height: 42,
		rounded: "sm",
		size: "small",
	},
	VTextField: {
		color: "primary",
		bgcolor:"surface",
		rounded: "xl",
		variant: "solo",
		density: "compact",

	},
};
