import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorMre } from "../target/types/anchor_mre";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

describe("anchor-mre", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.AnchorMre as Program<AnchorMre>;
  const provider = anchor.getProvider();
  const myKp = anchor.web3.Keypair.generate();

  const num0 = new anchor.BN(50);
  const num1 = new anchor.BN(100);

  const demoAcc = PublicKey.findProgramAddressSync(
    [Buffer.from("Demo"), num1.toBuffer('le', 8)],
    program.programId,
  )[0];

  it("Is initialized!", async () => {
    const tx = new Transaction();
    tx.instructions = [
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: myKp.publicKey,
        lamports: LAMPORTS_PER_SOL,
      }),
    ];

    await provider.sendAndConfirm(tx);


    await program.methods.createDemo(num1).accounts({
      user: myKp.publicKey,
      demo: demoAcc,
      systemProgram: SystemProgram.programId,
    }).signers([myKp]).rpc();

    // // SHOULD NOT work, num1 and num0 are in the wrong order, 
    // // but does
    // await program.methods.demo(num1, num0).accounts({
    //   user: myKp.publicKey,
    //   demo: demoAcc,
    // }).signers([myKp]).rpc();

    // SHOULD work, num0 and num1 are in the right order
    await program.methods.demo(num0, num1,).accounts({
      user: myKp.publicKey,
      demo: demoAcc,
    }).signers([myKp]).rpc();


  });
});
