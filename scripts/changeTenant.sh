#!/bin/bash

set -e

TENANT_ITEMS=("app.json" "assets" "translationModifier.js")
THIS_SCRIPT=$0
TENANT_TO_SWITCH_TO=$1

if [[ ! -d "tenants/$TENANT_TO_SWITCH_TO" ]]; then
  echo "This tenant does not exist."
  echo "If you would like to create this tenant from a copy of an existing tenant, enter the existing tenant and hit ENTER. Otherwise, just hit ENTER."

  read -r CREATE_FROM_THIS_TENANT

  if [[ "$CREATE_FROM_THIS_TENANT" = "" ]]; then
    # they chose not to create the tenant
    echo ""

  elif [[ -d "tenants/$CREATE_FROM_THIS_TENANT" ]]; then
    mkdir "tenants/$TENANT_TO_SWITCH_TO" || exit 1;
    for TENANT_ITEM in "${TENANT_ITEMS[@]}" ; do
      cp -R "tenants/$CREATE_FROM_THIS_TENANT/$TENANT_ITEM" "tenants/$TENANT_TO_SWITCH_TO/$TENANT_ITEM" || exit 1;
    done

    echo "The tenant $TENANT_TO_SWITCH_TO has been created."

    eval "$THIS_SCRIPT $TENANT_TO_SWITCH_TO"

  else
    echo "Invalid existing tenant."
  fi

else

  for TENANT_ITEM in "${TENANT_ITEMS[@]}" ; do
    if [[ ! -d "tenants/$TENANT_TO_SWITCH_TO/$TENANT_ITEM" ]] && [[ ! -f "tenants/$TENANT_TO_SWITCH_TO/$TENANT_ITEM" ]]; then
      INVALID_TENANT_DIR_CONTENTS=1
    fi
  done

  if [[ "$INVALID_TENANT_DIR_CONTENTS" ]]; then
    echo "The directory for this tenant does not have the required contents."

  else

    ##### everything checks out, now we make the switch #####

    # delete current tenant items
    INVALID_ITEMS=()
    for TENANT_ITEM in "${TENANT_ITEMS[@]}" ; do
      if [[ -L "./$TENANT_ITEM" ]]; then
        unlink "./$TENANT_ITEM";
      elif [[ -e "./$TENANT_ITEM" ]]; then
        INVALID_ITEMS+=("$TENANT_ITEM")
      fi
    done

    if [[ "${#INVALID_ITEMS[@]}" -gt 0 ]]; then
      echo "The following items are not symlinks and must be deleted manually:"
      for INVALID_ITEM in "${INVALID_ITEMS[@]}" ; do
        echo "  $INVALID_ITEM"
      done
      echo ""
      echo "Run this command to delete them:"
      echo "  rm -rf $(printf "%q " "${INVALID_ITEMS[@]}")"
      exit 1
    fi

    # copy tenant items to the base dir
    for TENANT_ITEM in "${TENANT_ITEMS[@]}" ; do
      ln -s "$PWD/tenants/$TENANT_TO_SWITCH_TO/$TENANT_ITEM" "./$TENANT_ITEM";
    done

    # update src/utils/translations/current.json with the current language data
    LANGUAGE_CODE=$(jq -r .expo.extra.LANGUAGE_CODE app.json)
    if [[ ! "$(ls -A src/utils/translations/"$LANGUAGE_CODE".json 2>/dev/null)" ]]; then
      LANGUAGE_CODE="en"
    fi
    ln -sf "./$LANGUAGE_CODE.json" "src/utils/translations/current.json";

    echo "Changed tenant to $TENANT_TO_SWITCH_TO (language code: $LANGUAGE_CODE)."
  fi
fi

echo ""
