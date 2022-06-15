package net.cctv3.DuoleCalculator.newarchitecture.cache;

import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferenceUtils {
    private Context context = null;
    private SharedPreferences sp = null;

    /** isAgreedWelcomeScreen: 是否同意 `Welcome` 页面 */
    public static final String IS_AGREED_WELCOME_SCREEN = "isShownWelcomeScreen";

    public SharedPreferenceUtils(Context context) {
        this.context = context;
        this.sp = context.getSharedPreferences("nativeConfig", Context.MODE_PRIVATE);
    }

    public boolean set(String key, String value) {
        SharedPreferences.Editor editor = sp.edit();
        return editor.putString(key, value).commit();
    }

    public String get(String key) {
        return sp.getString(key, "");
    }
}