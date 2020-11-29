"use strict";

const parser = require("../lib/parser");
var assert = require("chai").assert;
const h = require("fido2-helpers");

describe("parseAttestationObject (fido-u2f)", function() {
	it("parser is object", function() {
		assert.isObject(parser);
	});

	var ret = parser.parseAttestationObject(h.lib.makeCredentialAttestationU2fResponse.response.attestationObject);
	it("parser returns Map with correct size", function() {
		assert.instanceOf(ret, Map);
		assert.strictEqual(ret.size, 14);
	});

	it("parses fmt", function() {
		var fmt = ret.get("fmt");
		assert.strictEqual(fmt, "fido-u2f");
	});

	it("parses sig", function() {
		var sig = ret.get("sig");
		assert.instanceOf(sig, ArrayBuffer);
		assert.strictEqual(sig.byteLength, 72);
		var expectedSig = new Uint8Array([
			0x30, 0x46, 0x02, 0x21, 0x00, 0xEF, 0xBA, 0xF3, 0x72, 0x12, 0x26, 0x12, 0x9D, 0x99, 0x43, 0xE6,
			0x55, 0xB4, 0x2E, 0x61, 0x9B, 0x29, 0xF2, 0x59, 0x03, 0xED, 0x82, 0x5C, 0x22, 0x71, 0xD2, 0xDD,
			0x03, 0x9F, 0x6E, 0xB8, 0xA8, 0x02, 0x21, 0x00, 0xCE, 0x03, 0x09, 0xE3, 0xDF, 0x5C, 0x05, 0xCC,
			0xC1, 0xC3, 0xCD, 0xBA, 0xAF, 0x59, 0xB9, 0xE4, 0x99, 0x9D, 0xF6, 0x64, 0xF8, 0x77, 0x58, 0x84,
			0x5D, 0x84, 0xBC, 0x15, 0xB2, 0x27, 0xF0, 0xCA,
		]).buffer;
		assert(h.functions.arrayBufferEquals(sig, expectedSig), "sig contains right bytes");
	});

	it("parses x5c", function() {
		var x5c = ret.get("x5c");
		assert.isArray(x5c);
		assert.strictEqual(x5c.length, 0);
	});

	it("parses attestation cert", function() {
		var attCert = ret.get("attCert");
		assert.instanceOf(attCert, ArrayBuffer);
		var expectedAttCert = new Uint8Array([
			0x30, 0x82, 0x02, 0x44, 0x30, 0x82, 0x01, 0x2E, 0xA0, 0x03, 0x02, 0x01, 0x02, 0x02, 0x04, 0x55,
			0x62, 0xBE, 0xA0, 0x30, 0x0B, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x0B,
			0x30, 0x2E, 0x31, 0x2C, 0x30, 0x2A, 0x06, 0x03, 0x55, 0x04, 0x03, 0x13, 0x23, 0x59, 0x75, 0x62,
			0x69, 0x63, 0x6F, 0x20, 0x55, 0x32, 0x46, 0x20, 0x52, 0x6F, 0x6F, 0x74, 0x20, 0x43, 0x41, 0x20,
			0x53, 0x65, 0x72, 0x69, 0x61, 0x6C, 0x20, 0x34, 0x35, 0x37, 0x32, 0x30, 0x30, 0x36, 0x33, 0x31,
			0x30, 0x20, 0x17, 0x0D, 0x31, 0x34, 0x30, 0x38, 0x30, 0x31, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
			0x5A, 0x18, 0x0F, 0x32, 0x30, 0x35, 0x30, 0x30, 0x39, 0x30, 0x34, 0x30, 0x30, 0x30, 0x30, 0x30,
			0x30, 0x5A, 0x30, 0x2A, 0x31, 0x28, 0x30, 0x26, 0x06, 0x03, 0x55, 0x04, 0x03, 0x0C, 0x1F, 0x59,
			0x75, 0x62, 0x69, 0x63, 0x6F, 0x20, 0x55, 0x32, 0x46, 0x20, 0x45, 0x45, 0x20, 0x53, 0x65, 0x72,
			0x69, 0x61, 0x6C, 0x20, 0x31, 0x34, 0x33, 0x32, 0x35, 0x33, 0x34, 0x36, 0x38, 0x38, 0x30, 0x59,
			0x30, 0x13, 0x06, 0x07, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x02, 0x01, 0x06, 0x08, 0x2A, 0x86, 0x48,
			0xCE, 0x3D, 0x03, 0x01, 0x07, 0x03, 0x42, 0x00, 0x04, 0x4B, 0x33, 0x1F, 0x77, 0x3D, 0x81, 0x44,
			0xB9, 0x99, 0x5C, 0xBE, 0x45, 0x85, 0x51, 0x7E, 0x17, 0x58, 0x3A, 0xA4, 0x76, 0x23, 0x69, 0x5C,
			0xBE, 0x85, 0xAC, 0x48, 0x2C, 0x80, 0x19, 0xF2, 0xC9, 0xB9, 0x46, 0x7A, 0xE0, 0x45, 0xB0, 0xE6,
			0x6F, 0x13, 0x1B, 0x2E, 0xA3, 0x24, 0x3C, 0x91, 0xFD, 0xA6, 0x02, 0xE3, 0x18, 0xF3, 0xFC, 0x5D,
			0x8D, 0x2A, 0x7A, 0xBA, 0xE7, 0x2B, 0xD1, 0x43, 0x09, 0xA3, 0x3B, 0x30, 0x39, 0x30, 0x22, 0x06,
			0x09, 0x2B, 0x06, 0x01, 0x04, 0x01, 0x82, 0xC4, 0x0A, 0x02, 0x04, 0x15, 0x31, 0x2E, 0x33, 0x2E,
			0x36, 0x2E, 0x31, 0x2E, 0x34, 0x2E, 0x31, 0x2E, 0x34, 0x31, 0x34, 0x38, 0x32, 0x2E, 0x31, 0x2E,
			0x35, 0x30, 0x13, 0x06, 0x0B, 0x2B, 0x06, 0x01, 0x04, 0x01, 0x82, 0xE5, 0x1C, 0x02, 0x01, 0x01,
			0x04, 0x04, 0x03, 0x02, 0x05, 0x20, 0x30, 0x0B, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D,
			0x01, 0x01, 0x0B, 0x03, 0x82, 0x01, 0x01, 0x00, 0xAC, 0x16, 0xD9, 0xB3, 0x6E, 0xB6, 0xB3, 0xA9,
			0xB7, 0x6D, 0x75, 0x94, 0xB3, 0x4F, 0x59, 0xF4, 0xF7, 0x3E, 0xDB, 0xC9, 0xFD, 0xEB, 0x29, 0x35,
			0xEB, 0x6B, 0x45, 0x1C, 0xAB, 0xF4, 0x1D, 0x25, 0xD3, 0xE7, 0x16, 0x14, 0xD7, 0x47, 0x26, 0x04,
			0xCA, 0x72, 0xA5, 0x78, 0xE3, 0x23, 0xED, 0xB7, 0x60, 0x04, 0x68, 0x5F, 0x05, 0xE7, 0xD1, 0xB9,
			0xBE, 0x05, 0xDB, 0x6E, 0x94, 0x40, 0xFA, 0xC5, 0xCF, 0xC9, 0x32, 0xA6, 0xCA, 0xFA, 0xE8, 0x52,
			0x99, 0x77, 0x2E, 0xDB, 0x02, 0x78, 0x20, 0x20, 0x3C, 0xD4, 0x14, 0x1D, 0x3E, 0xEB, 0x6F, 0x6A,
			0x2C, 0xE9, 0x9E, 0x39, 0x57, 0x80, 0x32, 0x63, 0xAB, 0xAB, 0x8D, 0x6E, 0xC4, 0x80, 0xA7, 0xDF,
			0x08, 0x4A, 0xD2, 0xCB, 0xA7, 0xB7, 0xD6, 0xD7, 0x7C, 0x94, 0xC3, 0xEB, 0xC0, 0xB1, 0x66, 0xF9,
			0x60, 0x57, 0xCA, 0xF5, 0xFE, 0x3A, 0x63, 0x1E, 0xA2, 0x6A, 0x43, 0x37, 0x62, 0xA3, 0x6F, 0xBE,
			0xCF, 0x4C, 0xF4, 0x45, 0x09, 0x62, 0x5F, 0xD5, 0xAF, 0x10, 0x49, 0xAA, 0x7C, 0x8B, 0xC7, 0x68,
			0x9A, 0x66, 0x59, 0xE9, 0xAF, 0x5D, 0xE8, 0xF0, 0xD7, 0x2C, 0x28, 0x82, 0x51, 0x74, 0xC5, 0x0E,
			0x06, 0xAB, 0x7F, 0x6A, 0x07, 0x90, 0x83, 0x7B, 0x6D, 0xB3, 0x2A, 0xBF, 0xDC, 0xBC, 0xA8, 0x35,
			0xCB, 0xBB, 0x09, 0x0E, 0xF1, 0xF0, 0xD9, 0x9E, 0x08, 0x69, 0xBF, 0xE9, 0xE5, 0x67, 0x64, 0xC4,
			0x23, 0x0E, 0x6C, 0x05, 0x77, 0x29, 0xB0, 0x10, 0xDE, 0x0E, 0xC5, 0xF9, 0xCC, 0xE4, 0xC9, 0x1C,
			0x28, 0x26, 0x21, 0x8E, 0xA8, 0x08, 0x1A, 0xBB, 0x96, 0x91, 0x51, 0xEC, 0x16, 0x72, 0x5A, 0xF2,
			0xA8, 0xD9, 0x5E, 0x77, 0x95, 0xBC, 0xAA, 0x22, 0x7A, 0x9B, 0x94, 0x43, 0x20, 0xC4, 0x27, 0x61,
			0x9C, 0xAA, 0xF8, 0x54, 0xD9, 0x82, 0x98, 0xD7,
		]).buffer;
		assert(h.functions.arrayBufferEquals(attCert, expectedAttCert), "attCert contains right bytes");
	});

	it("parses raw authCBOR", function() {
		var rawAuthnrData = ret.get("rawAuthnrData");
		assert.instanceOf(rawAuthnrData, ArrayBuffer);
		var expectedRawAuthnrData = new Uint8Array([
			0x49, 0x96, 0x0D, 0xE5, 0x88, 0x0E, 0x8C, 0x68, 0x74, 0x34, 0x17, 0x0F, 0x64, 0x76, 0x60, 0x5B,
			0x8F, 0xE4, 0xAE, 0xB9, 0xA2, 0x86, 0x32, 0xC7, 0x99, 0x5C, 0xF3, 0xBA, 0x83, 0x1D, 0x97, 0x63,
			0x41, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x06, 0x8F, 0x95, 0x8C, 0x73, 0xA4, 0x25, 0x9C, 0xBC,
			0x0E, 0x39, 0xC2, 0x26, 0x72, 0x1C, 0xD0, 0xEC, 0x6D, 0xF5, 0x00, 0x33, 0xE6, 0xEA, 0x4C, 0x75,
			0x22, 0x71, 0x35, 0xB7, 0x7E, 0x1B, 0x20, 0x28, 0xE8, 0xC3, 0x48, 0xBC, 0xF0, 0x5B, 0xF5, 0x8B,
			0x14, 0x94, 0x4D, 0x19, 0x25, 0xA6, 0x96, 0x5E, 0xD5, 0x87, 0xE4, 0x54, 0x32, 0x3D, 0x2E, 0x9B,
			0x4F, 0xF7, 0xBA, 0xF7, 0xC2, 0x22, 0xAD, 0xA5, 0x01, 0x02, 0x03, 0x26, 0x20, 0x01, 0x21, 0x58,
			0x20, 0x35, 0x73, 0xD0, 0x08, 0x78, 0x7E, 0x6C, 0x37, 0xAC, 0x75, 0x43, 0xED, 0xAA, 0x47, 0xBB,
			0xF6, 0xE7, 0x9B, 0x64, 0x78, 0x66, 0xD6, 0xB3, 0x41, 0x02, 0x08, 0x3C, 0x37, 0xE6, 0x42, 0x46,
			0x04, 0x22, 0x58, 0x20, 0x18, 0xD3, 0x53, 0x1A, 0xEE, 0x69, 0xD8, 0xC5, 0x14, 0xC9, 0xD6, 0x95,
			0x1E, 0x6B, 0x3C, 0x9A, 0xF6, 0xDE, 0xC0, 0x49, 0x4F, 0xDA, 0x9E, 0xC5, 0x8F, 0x4F, 0x09, 0xCF,
			0x68, 0xF2, 0x19, 0x93,
		]).buffer;
		assert(h.functions.arrayBufferEquals(rawAuthnrData, expectedRawAuthnrData), "authData contains right bytes");
	});

	it("parses rpIdHash", function() {
		var rpIdHash = ret.get("rpIdHash");
		var expectedRpIdHash = new Uint8Array([
			0x49, 0x96, 0x0D, 0xE5, 0x88, 0x0E, 0x8C, 0x68, 0x74, 0x34, 0x17, 0x0F, 0x64, 0x76, 0x60, 0x5B,
			0x8F, 0xE4, 0xAE, 0xB9, 0xA2, 0x86, 0x32, 0xC7, 0x99, 0x5C, 0xF3, 0xBA, 0x83, 0x1D, 0x97, 0x63,
		]).buffer;
		assert(h.functions.arrayBufferEquals(rpIdHash, expectedRpIdHash), "correct rpIdHash");
	});

	it("parses flags", function() {
		var flags = ret.get("flags");
		assert.instanceOf(flags, Set);
		assert.strictEqual(flags.size, 2);
		assert.isTrue(flags.has("UP"));
		assert.isTrue(flags.has("AT"));
	});

	it("parses counter", function() {
		assert.strictEqual(ret.get("counter"), 0);
		assert.isNumber(ret.get("counter"));
	});

	it("parses AAGUID", function() {
		var aaguid = ret.get("aaguid");
		assert.instanceOf(aaguid, ArrayBuffer);
		var expectedAaguid = new Uint8Array([
			0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		]).buffer;
		assert(h.functions.arrayBufferEquals(aaguid, expectedAaguid), "correct aaguid");
	});

	it("parses credential ID length", function() {
		assert.strictEqual(ret.get("credIdLen"), 64);
	});

	it("parses credential ID", function() {
		var credId = ret.get("credId");
		assert.instanceOf(credId, ArrayBuffer);
		var expectedCredId = new Uint8Array([
			0x06, 0x8F, 0x95, 0x8C, 0x73, 0xA4, 0x25, 0x9C, 0xBC, 0x0E, 0x39, 0xC2, 0x26, 0x72, 0x1C, 0xD0,
			0xEC, 0x6D, 0xF5, 0x00, 0x33, 0xE6, 0xEA, 0x4C, 0x75, 0x22, 0x71, 0x35, 0xB7, 0x7E, 0x1B, 0x20,
			0x28, 0xE8, 0xC3, 0x48, 0xBC, 0xF0, 0x5B, 0xF5, 0x8B, 0x14, 0x94, 0x4D, 0x19, 0x25, 0xA6, 0x96,
			0x5E, 0xD5, 0x87, 0xE4, 0x54, 0x32, 0x3D, 0x2E, 0x9B, 0x4F, 0xF7, 0xBA, 0xF7, 0xC2, 0x22, 0xAD,
		]).buffer;
		assert(h.functions.arrayBufferEquals(credId, expectedCredId), "correct credId");
	});

	it("parses credential public key (COSE)", function() {
		var credentialPublicKeyCose = ret.get("credentialPublicKeyCose");
		assert.instanceOf(credentialPublicKeyCose, ArrayBuffer);
		var expectedCredentialPublicKeyCose = new Uint8Array([
			0xA5, 0x01, 0x02, 0x03, 0x26, 0x20, 0x01, 0x21, 0x58, 0x20, 0x35, 0x73, 0xD0, 0x08, 0x78, 0x7E,
			0x6C, 0x37, 0xAC, 0x75, 0x43, 0xED, 0xAA, 0x47, 0xBB, 0xF6, 0xE7, 0x9B, 0x64, 0x78, 0x66, 0xD6,
			0xB3, 0x41, 0x02, 0x08, 0x3C, 0x37, 0xE6, 0x42, 0x46, 0x04, 0x22, 0x58, 0x20, 0x18, 0xD3, 0x53,
			0x1A, 0xEE, 0x69, 0xD8, 0xC5, 0x14, 0xC9, 0xD6, 0x95, 0x1E, 0x6B, 0x3C, 0x9A, 0xF6, 0xDE, 0xC0,
			0x49, 0x4F, 0xDA, 0x9E, 0xC5, 0x8F, 0x4F, 0x09, 0xCF, 0x68, 0xF2, 0x19, 0x93,
		]).buffer;
		assert(h.functions.arrayBufferEquals(credentialPublicKeyCose, expectedCredentialPublicKeyCose), "correct credentialPublicKeyCose");
	});

	it("creates public key JWK", function() {
		var credentialPublicKeyJwk = ret.get("credentialPublicKeyJwk");
		assert.isObject(credentialPublicKeyJwk);
		assert.strictEqual(Object.keys(credentialPublicKeyJwk).length, 5);
		assert.strictEqual(credentialPublicKeyJwk.kty, "EC");
		assert.strictEqual(credentialPublicKeyJwk.crv, "P-256");
		assert.strictEqual(credentialPublicKeyJwk.alg, "ECDSA_w_SHA256");
		assert.strictEqual(credentialPublicKeyJwk.x, "NXPQCHh+bDesdUPtqke79uebZHhm1rNBAgg8N+ZCRgQ=");
		assert.strictEqual(credentialPublicKeyJwk.y, "GNNTGu5p2MUUydaVHms8mvbewElP2p7Fj08Jz2jyGZM=");
	});

	it("creates public key PEM", function() {
		var credentialPublicKeyPem = ret.get("credentialPublicKeyPem");
		assert.isString(credentialPublicKeyPem);
		var expectedPem =
            "-----BEGIN PUBLIC KEY-----\n" +
            "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENXPQCHh+bDesdUPtqke79uebZHhm\n" +
            "1rNBAgg8N+ZCRgQY01Ma7mnYxRTJ1pUeazya9t7ASU/ansWPTwnPaPIZkw==\n" +
            "-----END PUBLIC KEY-----\n";
		assert.strictEqual(credentialPublicKeyPem, expectedPem);
	});
});

describe("parseAttestationObject (fido-u2f Hypersecu)", function() {
	it("can parse", function() {
		var ret = parser.parseAttestationObject(h.lib.makeCredentialAttestationHypersecuU2fResponse.response.attestationObject);
		assert.instanceOf(ret, Map);
		assert.strictEqual(ret.size, 14);
	});
});
