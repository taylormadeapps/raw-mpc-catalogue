# Ruminant Audio Works MPC

Get Ruminant Audio Works plugins on your standalone MPC. Set up the loader once, then use it to add plugins from your MPC.

- [Read the full setup guide](https://mpc.ruminantaudioworks.com/docs/)
- [Download RAW MPC USB Creator for Mac · Alpha 3](https://github.com/taylormadeapps/raw-mpc-catalogue/releases/download/usb-creator-v0.1.0-alpha.3/RAW-MPC-USB-Creator-0.1.0-alpha.3-macOS-arm64.pkg)
- [Download RAW MPC USB Creator for Windows x64 · Alpha 3](https://github.com/taylormadeapps/raw-mpc-catalogue/releases/download/usb-creator-v0.1.0-alpha.3/RAW-MPC-USB-Creator-0.1.0-alpha.3-windows-x64.zip)

## What you’ll need

- A **first-generation standalone MPC**. Akai lists the MPC One, One+, Live, Live II, X, X SE, Key 37 and Key 61 in its [Gen 1 range](https://www.akaipro.com/downloads-and-support/downloads/?legacy=true).
- **MPC OS 3 with the original USB install prompt**. [Open MPC documents this USB method through MPC OS 3.9.1](https://github.com/open-mpc/mpc-vst-plugins/blob/main/docs/USB_STICK.md#how-the-route-works).
- **RAW MPC USB Creator Alpha 3** on an **Apple silicon Mac running macOS 13 or later** or a **Windows 10 or 11 x64 PC**.
- A **FAT32 USB stick**. You can use one that already has projects or samples on it.

**Verified with RAW:** We installed and opened the loader on an **MPC One+ running MPC OS 3.9**. Other models and OS versions still need testing with RAW.

Check the version on your MPC under **Menu → Preferences → Info**. If it meets the requirements above, go straight to [On your Mac](#on-your-mac) or [On Windows](#on-windows). If you need 3.9.0, see [Akai’s firmware updater](#akai-firmware-updater).

## On your Mac

This is an early alpha. Back up your projects, samples and settings before trying it. Open the signed and notarised `.pkg` to install the app. The installer includes the warranty notice.

1. Plug in the stick and open **RAW MPC USB Creator**. You can leave the plugin list empty for your first install. If you already have a plugin download for Gen 1 MPC hardware, use **Add Packages…** and pick the ZIP or the whole plugin folder.
2. Click **Choose USB…**, pick the stick by name, then click **Write USB…** and confirm. USB Creator replaces any folder called `autorun`. Move that folder off the stick first if you want to keep it.
3. Wait for **USB ready**, then eject the stick in Finder.

## On Windows

Extract the whole Windows ZIP and run **RAW MPC USB Creator.exe** from the extracted folder. Keep the files together. This alpha is unsigned and includes a warranty notice.

1. Plug in a FAT32 USB stick. To bundle plugins, use **Add ZIPs…** or **Add Folder…**. Use the original ZIP if a plugin includes executable files.
2. Click **Choose USB…** and select the drive itself under **This PC**. Click **Write USB…** and confirm. USB Creator replaces the `autorun` folder on the selected drive.
3. Wait for **USB ready**, then eject the stick in Windows.

## On your MPC

**Already using Alpha 1 or 2?** Make a new stick with Alpha 3 and follow the same install steps. The installer updates the existing RAW loader.

1. **Save your project.** Plug in the stick and tap **Install** when the MPC asks. Leave the stick plugged in until the MPC screen comes back.
2. Create a **Plugin** track and open the instrument browser. Choose **RAW MPC Plugin Loader** under **Ruminant Audio Works**. Look for **Loader 0.1.1** and a short build ID at the top of the loader screen. If the update fails, check `autorun/INSTALL-RESULT.txt` on the stick.

## Add your own plugins to the stick

Once the stick is written, you can add plugins in Finder or File Explorer.

1. Open the stick and look for `RAW-MPC-Plugins` next to `autorun`. If it’s missing, make that folder.
2. Copy each complete Gen 1 MPC (ARMv7) plugin ZIP or folder into `RAW-MPC-Plugins`. A loose `.so` needs its `plugin-meta.xml` and any skin or other files the plugin comes with.
3. Eject the stick and plug it into the MPC. With the loader installed, open **RAW MPC Plugin Loader** and tap **USB Files**, then **Refresh** if needed. Use **Prev** or **Next** to pick a plugin. Save your project, tap **Install**, then **Confirm**.

Files copied this way appear under **USB Files**. To install a plugin with the loader at the first USB prompt, add it in USB Creator when you make the stick. [See the example folder layout](https://mpc.ruminantaudioworks.com/docs/#add-own-plugins).

## Add plugins from the catalogue

Connect your MPC to the internet and open the loader. Choose **RAW Catalogue** for Ruminant Audio Works releases or **Open MPC** for compatible community plugins. Pick a plugin with **Prev** or **Next**. Save your project, tap **Install**, then **Confirm**.

If the install prompt or a plugin is missing, see [If you get stuck](https://mpc.ruminantaudioworks.com/docs/#troubleshooting).

## Akai firmware updater

Use Akai’s **MPC Gen 1 firmware updater for 3.9.0** if you need to install that version on your Gen 1 MPC.

- [Download Akai’s 3.9.0 updater for Mac](https://cdn.inmusicbrands.com/Software/15JM26PSBC/MPC%20%28Gen%201%29%203.9.0%20Updater.app.zip)
- [Download Akai’s 3.9.0 updater for Windows](https://cdn.inmusicbrands.com/Software/15JM26PSBC/MPC%20%28Gen%201%29%203.9.0%20Updater.exe)
- [Find other versions in Akai’s Legacy Downloads](https://www.akaipro.com/downloads-and-support/downloads/?legacy=true) under **Legacy MPC Firmware (Gen 1)**

1. Back up your projects and samples to a separate drive. Plug the MPC into power and connect it directly to your computer with a USB cable.
2. Open the Akai updater you downloaded. On a Mac, open the ZIP first if it hasn’t already been unpacked.
3. On the MPC, go to **Menu → Preferences → Info → Update → Switch to Update Mode**.
4. Once the MPC is in Update Mode, click **Update MPC** in the Akai updater on your computer. Keep the USB cable and power connected while it runs.
5. When the MPC starts up again, check for **3.9.0** under **Menu → Preferences → Info**.

For help with the updater, see [Akai’s official walkthrough](https://support.akaipro.com/en/support/solutions/articles/69000816160-akai-pro-mpc-series-firmware-update-walkthrough).
